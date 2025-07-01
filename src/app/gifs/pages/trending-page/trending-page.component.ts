import { AfterViewInit, Component, computed, effect, ElementRef, signal, viewChild } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from '../../shared/services/scroll-state.services';

@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export default class TrendingPageComponent implements AfterViewInit {
  public groupSignal = signal<Gif[][]>([])
  public gifsGroup = computed(() => this.gifService.trendingGifGroup())
  public scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  constructor(
    private gifService: GifService,
    private scrollService: ScrollStateService
  ) {
    /* TODO: manera de como leer reactivamente un signal desde un service */
    console.log(this.groupSignal())
    effect(() => {
      //const gifsGroup = this.gifService.trendingGifGroup()
      this.groupSignal.set(this.gifService.trendingGifGroup())
      console.log(this.groupSignal())

    })
  }

  public ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return

    scrollDiv.scrollTop = this.scrollService.trendingScrollState()

  }

  public gifs = computed(() => this.gifService.trendingGifs())

  public onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return
    const scrollTop = scrollDiv.scrollTop
    const clientHeight = scrollDiv.clientHeight
    const scrollHeight = scrollDiv.scrollHeight

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollService.trendingScrollState.set(scrollTop)

    if (isAtBottom) {
      this.gifService.loadTrendingGifs()
    }
  }

}
