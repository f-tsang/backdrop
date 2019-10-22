import {animate, state, style, transition, trigger} from '@angular/animations'
import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core'
import {Store} from '@ngrx/store'
import {filter, pluck, take} from 'rxjs/operators'

import {
  BackdropState,
  DoneAnimating,
  getAnimationParams,
  getAnimationState,
  getTitle,
  HideBackdrop,
  ShowBackdrop,
  StartAnimating
} from './backdrop'

@Component({
  selector: 'ft-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  animations: [
    trigger('translateUpDown', [
      state('up', style({transform: 'translateY(0)'})),
      state('down', style({transform: 'translateY(calc({{ translateY }}))'}), {
        params: {translateY: '100% - 48px'}
      }),
      transition('void => down', [
        style({transform: 'translateY(100%)'}),
        animate('0.2s 0.1s ease')
      ]),
      transition('* <=> *', [animate('0.2s 0.1s ease')])
    ])
  ]
})
export class BackdropComponent implements AfterViewInit, OnDestroy {
  @Input()
  options = {divider: false}
  title = this.store.select(getTitle)

  private animationState: {value: 'up' | 'down'; params: object}
  private subscription = this.store
    .select(getAnimationState)
    .subscribe(animationState =>
      Promise.resolve().then(() => (this.animationState = animationState))
    )

  constructor(private store: Store<BackdropState>) {}
  ngAfterViewInit() {
    // Show backdrop (default).
    this.store
      .select(getAnimationParams)
      .pipe(
        take(1),
        pluck('translateY'),
        filter(translateY => translateY === '100%')
      )
      .subscribe(this.show.bind(this))
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  show() {
    this.store.dispatch(new ShowBackdrop())
  }
  hide() {
    this.store.dispatch(new HideBackdrop())
  }

  @HostListener('(@translateUpDown.start)')
  animationStart() {
    this.store.dispatch(new StartAnimating())
  }
  @HostListener('(@translateUpDown.done)')
  anmiationDone() {
    this.store.dispatch(new DoneAnimating())
  }

  @HostBinding('@translateUpDown')
  get state() {
    return this.animationState
  }
}
