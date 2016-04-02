import {createStore, compose} from 'redux';
import {persistState} from 'redux-devtools';
import rootReducer from '../reducer';
import DevTools from '../containers/DevTool';
import { fromJS } from 'immutable'

const enhancer = compose(
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
