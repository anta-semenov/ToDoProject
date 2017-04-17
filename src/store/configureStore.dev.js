import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducer'
import { fromJS } from 'immutable'

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = middleware => composeEnchancer(
  applyMiddleware(...middleware)
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
