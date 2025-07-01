import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export default class GifHistoryComponent implements OnInit {
  public key: Signal<string>
  public gifsByKey = computed(() => this.gifService.getSearchHistory(this.key()))

  constructor(
    private activateRoute: ActivatedRoute,
    private gifService: GifService
  ) {
    this.key = toSignal(this.activateRoute.params.pipe(map(params => params['key'])))
    console.log(this.key())
  }

  public ngOnInit(): void {
  }


}
