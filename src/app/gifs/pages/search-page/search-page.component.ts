import { Component, computed, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mappers/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent {

  constructor(private gifService: GifService){ }

  public gifs = signal<Gif[]>([])

  public onSearch(query: string) {
    this.gifService.searchGif(query).subscribe((resp) => {
      this.gifs.set(resp)
    })
  }

}
