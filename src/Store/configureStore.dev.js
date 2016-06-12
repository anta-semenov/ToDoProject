import { createStore, compose, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import rootReducer from '../reducer'
import DevTools from '../containers/DevTool'
import { fromJS } from 'immutable'

const enhancer = middleware => compose(
  applyMiddleware(...middleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

export default function configureStore(initialState = fromJS({}), middleware) {

  const store = createStore(rootReducer, initialState, enhancer(middleware));

  if (module.hot) {
    module.hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer').default)
    );
  }

  return store;
}
