import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'
import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core'
import {Store} from '@ngrx/store'
import {delay, filter, map, pluck, take} from 'rxjs/operators'

import {
  BackdropState,
  DoneAnimating,
  getAnimationParams,
  getAnimationState,
  getControlsHidden,
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
        params: {translateY: '100% - 3rem'}
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
  // TODO - Inputs to set CSS variables
  // TODO - set options to apply properties
  @Input() options = {
    divider: false
  }
  @HostBinding('class.backdrop-header') hasTitle = false
  title = this.store.select(getTitle)
  controlsHidden = this.store.select(getControlsHidden)

  private animationState: {value: 'up' | 'down'; params: object}
  private animationStateSub = this.store
    .select(getAnimationState)
    .pipe(delay(0))
    .subscribe(animationState => (this.animationState = animationState))
  private titleSub = this.title
    .pipe(map(Boolean))
    .subscribe(hasTitle => (this.hasTitle = hasTitle))

  constructor(private store: Store<BackdropState>) {}
  ngAfterViewInit() {
    // Show backdrop (default setting).
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
    this.titleSub.unsubscribe()
    this.animationStateSub.unsubscribe()
  }

  show() {
    this.store.dispatch(new ShowBackdrop())
  }
  hide() {
    this.store.dispatch(new HideBackdrop())
  }

  @HostListener('@translateUpDown.start', ['$event'])
  animationStart({totalTime, toState, fromState}: AnimationEvent) {
    this.store.dispatch(new StartAnimating({totalTime, toState, fromState}))
  }
  @HostListener('@translateUpDown.done', ['$event'])
  animationDone({totalTime, toState, fromState}: AnimationEvent) {
    this.store.dispatch(new DoneAnimating({totalTime, toState, fromState}))
  }

  @HostBinding('@translateUpDown')
  get state() {
    return this.animationState
  }
}
