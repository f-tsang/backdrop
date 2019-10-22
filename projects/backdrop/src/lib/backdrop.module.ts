import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {Action, StoreModule} from '@ngrx/store'

import {
  ActionTypes,
  BackdropState,
  HideBackdrop,
  selectBackdrop as featureName,
  SetBackdropTitle,
  ShowBackdrop
} from './backdrop'
import {BackdropComponent} from './backdrop.component'

@NgModule({
  declarations: [BackdropComponent],
  imports: [CommonModule, StoreModule.forFeature(featureName, backdropReducer)],
  exports: [BackdropComponent]
})
export class BackdropModule {}

const initialState: BackdropState = {
  title: '',
  position: 'down',
  isAnimating: false,
  params: {translateY: '100%'}
}
export function backdropReducer(
  state = initialState,
  action: Action
): BackdropState {
  switch (action.type) {
    case ActionTypes.SetBackdropTitle: {
      const {title} = action as SetBackdropTitle
      return {...state, title}
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
