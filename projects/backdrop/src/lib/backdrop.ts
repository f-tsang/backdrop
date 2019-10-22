import {Action, createFeatureSelector, createSelector} from '@ngrx/store'

export const enum ActionTypes {
  SetBackdropTitle = '[Backdrop] SET_BACKDROP_TITLE',
  ShowBackdrop = '[Backdrop] SHOW_BACKDROP',
  HideBackdrop = '[Backdrop] HIDE_BACKDROP',
  StartAnimating = '[Backdrop] START_ANIMATION',
  DoneAnimating = '[Backdrop] DONE_ANIMATION'
}
export class SetBackdropTitle implements Action {
  readonly type = ActionTypes.SetBackdropTitle
  constructor(public title: string) {}
}
export class ShowBackdrop implements Action {
  readonly type = ActionTypes.ShowBackdrop
  constructor(public params?: object) {}
}
export class HideBackdrop implements Action {
  readonly type = ActionTypes.HideBackdrop
  constructor(public params?: object) {}
}
export class StartAnimating implements Action {
  readonly type = ActionTypes.StartAnimating
}
export class DoneAnimating implements Action {
  readonly type = ActionTypes.DoneAnimating
}

export interface BackdropState {
  title: string
  position: 'up' | 'down'
  isAnimating: boolean
  params?: object // Ex. {translateY: '100% - 48px'}
}
export const selectBackdrop = 'backdrop'
export const selectBackdropState = createFeatureSelector<BackdropState>(
  selectBackdrop
)
export const getTitle = createSelector(
  selectBackdropState,
  ({title}) => title
)
export const getPosition = createSelector(
  selectBackdropState,
  ({position}) => position
)
export const getIsAnimating = createSelector(
  selectBackdropState,
  ({isAnimating}) => isAnimating
)
export const getAnimationParams = createSelector(
  selectBackdropState,
  ({params}) => params
)
export const getAnimationState = createSelector(
  selectBackdropState,
  ({position: value, params}) => ({value, params})
)
