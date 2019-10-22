import {TestBed} from '@angular/core/testing'
import {Store} from '@ngrx/store'
import {MockStore, provideMockStore} from '@ngrx/store/testing'
import {TestScheduler} from 'rxjs/testing'

import {
  BackdropState,
  HideBackdrop,
  selectBackdrop,
  ShowBackdrop
} from './backdrop'
import {BackdropComponent} from './backdrop.component'

/**
 * TODO - Tests for animations
 */
describe('BackdropComponent', () => {
  let dispatchSpy: jasmine.Spy
  let component: BackdropComponent
  let store: MockStore<BackdropState>
  const initialState = {
    [selectBackdrop]: {
      title: '',
      position: 'down',
      isAnimating: false,
      params: {translateY: '100%'}
    }
  }
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackdropComponent, provideMockStore({initialState})]
    })
    store = TestBed.get<Store<BackdropState>>(Store)
    component = TestBed.get<BackdropComponent>(BackdropComponent)
  })
  afterEach(() => {
    dispatchSpy = undefined
    store.resetSelectors()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should default to an empty title', () => {
    // NOTE: Remove this. Test the reducer with testScheduler instead.
    component.title.subscribe(title => expect(title).toEqual(''))
  })
  it('should dispatch show backddrop action', () => {
    dispatchSpy = spyOn(store, 'dispatch')
    component.show()
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith(new ShowBackdrop())
  })
  it('should dispatch hide backddrop action', () => {
    dispatchSpy = spyOn(store, 'dispatch')
    component.hide()
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith(new HideBackdrop())
  })
})
