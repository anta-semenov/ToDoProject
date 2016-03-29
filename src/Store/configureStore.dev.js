import {createStore, compose} from 'redux';
import {persistState} from 'redux-devtools';
import rootReducer from '../reducer';
import DevTools from '../containers/DevTool';

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer').default)
    );
  }

  return store;
}
