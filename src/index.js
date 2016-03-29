import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { fromJS } from 'immutable'

const store = configureStore(fromJS({
  task: [
    {
      id: 0,
      title: 'Existing Task',
      completed: false,
      today: true
    }
  ]
}))

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
