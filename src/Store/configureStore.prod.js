import {createStore} from 'redux';
import rootReducer from '../Reducer';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
