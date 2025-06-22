import { Component, computed, effect, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export default class TrendingPageComponent {
  public groupSignal = signal<Gif[][]>([])
  public gifsGroup = computed(() => this.gifService.trendingGifGroup())

  constructor(private gifService: GifService) {
    /* TODO: manera de como leer reactivamente un signal desde un service */
    console.log(this.groupSignal())
   effect(()=> {
    //const gifsGroup = this.gifService.trendingGifGroup()
    this.groupSignal.set(this.gifService.trendingGifGroup())
    console.log(this.groupSignal())

   })
    
   }

  public gifs = computed(() => this.gifService.trendingGifs())
  
}
