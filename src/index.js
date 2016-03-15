import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Containers/Root'
import configureStore from './Store/configureStore';

const store = configureStore()

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
