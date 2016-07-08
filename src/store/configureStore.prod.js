import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducer'
import { fromJS } from 'immutable'

const enhancer = middleware => compose(
  applyMiddleware(...middleware)
)

export default function configureStore(initialState = fromJS({}), middleware) {
  return createStore(rootReducer, initialState, enhancer(middleware));
}
