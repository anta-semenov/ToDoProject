import { createStore, compose, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import rootReducer from '../reducer'
import DevTools from '../containers/DevTool'
import { fromJS } from 'immutable'
import { PRIORITY_HIGH } from '../constants/priorityLevels'
import { setStateForUser } from '../backend/firebaseHelper'

const enhancer = compose(
  applyMiddleware(setStateForUser),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

const initialStateDev = fromJS({
  task: [
    {
      id: 0,
      title: 'Existing Task',
      completed: false,
      today: true
    },
    {
      id: 1,
      title: 'Existing Task',
      completed: false,
      today: false
    },
    {
      id: 2,
      title: 'Create TaskInfo component',
      completed: false,
      today: false,
      description: 'This component should show the detaied infoe about active task',
      priority: PRIORITY_HIGH,
      date: new Date(2016, 3, 17)
    },
    {
      id: 3,
      title: 'Handle Date to local string',
      completed: false,
      today: false,
      priority: PRIORITY_HIGH,
      date: new Date(2016, 3, 17)
    }
  ],
  project: [
    {
      id: 0,
      title: 'Existing Project',
      completed: false
    }
  ],
  context: [
    {
      id: 0,
      title: 'Existing context'
    }
  ]
})

export default function configureStore(initialState = initialStateDev) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer').default)
    );
  }

  return store;
}
