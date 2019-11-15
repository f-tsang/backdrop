import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {Action, StoreModule} from '@ngrx/store'

import {
  ActionTypes,
  BackdropState,
  HideBackdrop,
  selectBackdrop,
  SetBackdropTitle,
  ShowBackdrop
} from './backdrop'
import {BackdropComponent} from './backdrop.component'

@NgModule({
  declarations: [BackdropComponent],
  imports: [CommonModule, StoreModule.forFeature(selectBackdrop, reducer)],
  exports: [BackdropComponent]
})
export class BackdropModule {}

const initialState: BackdropState = {
  title: null,
  position: 'down',
  isAnimating: false,
  controlsHidden: false,
  params: {translateY: '100%'}
}
export function reducer(state = initialState, action: Action): BackdropState {
  switch (action.type) {
    case ActionTypes.SetBackdropTitle: {
      const {title, hideControls} = action as SetBackdropTitle
      return {...state, title, controlsHidden: hideControls}
    }
    case ActionTypes.ShowBackdrop: {
      const {params} = action as ShowBackdrop
      return {...state, position: 'up', params}
    }
    case ActionTypes.HideBackdrop: {
      const {params} = action as HideBackdrop
      return {...state, position: 'down', params}
    }
    case ActionTypes.StartAnimating:
      return {...state, isAnimating: true}
    case ActionTypes.DoneAnimating:
      return {...state, isAnimating: false}
    default:
      return state
  }
}
