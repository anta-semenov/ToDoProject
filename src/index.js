import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import thunk from 'redux-thunk'
import configureStore from './store/configureStore'
import { fromJS } from 'immutable'
import initFirebase from './backend/firebase/init'

const store = configureStore(fromJS({}), [thunk])

initFirebase(store)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
