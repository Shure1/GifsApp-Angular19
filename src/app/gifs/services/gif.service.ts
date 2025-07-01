import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  public trendingGifs = signal<Gif[]>([]);
  public trendingGifsLoading = signal(false);

  public searchHistory = signal<Record<string, Gif[]>>(this.loadFromLocalStorage())
  public searchHistorysKeys = computed(() => Object.keys(this.searchHistory()))

  public trendingGifGroup = computed<Gif[][]>(() => {
    const groups = []
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3))
    }
    return groups
  })

  private trendingPage = signal(0)

  constructor(private http: HttpClient) {
    this.loadTrendingGifs()
  }

  public saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem('gifs', historyString)
  })

  public loadFromLocalStorage() {
    const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}'
    const gifs = JSON.parse(gifsFromLocalStorage)
    return gifs;
  }

  public loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(`${environment.apiUrl}/gifs/trending`, { params: { api_key: environment.apiKey, limit: 20, offset: this.trendingPage() * 20 } })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
        this.trendingGifs.update(currentGifs => [
          ...currentGifs,
          ...gifs
        ])
        this.trendingPage.update(page => page + 1)
        this.trendingGifsLoading.set(false)
      })
  }

  public searchGif(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.apiUrl}/gifs/search`, { params: { api_key: environment.apiKey, limit: 20, q: query } })
      .pipe(
        map((resp) => GifMapper.mapGiphyItemToGifArray(resp.data)),
        tap(items => {
          this.searchHistory.update(history => ({
            ...history,
            [query]: items

          }))
        })
      )
  }

  public getSearchHistory(key: string): Gif[] {
    return this.searchHistory()[key]
  }
}
