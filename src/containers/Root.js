import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { hot } from 'react-hot-loader'
import App from '../components/app/App'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path='/(:section)(/:task)' component={App} />
      </Router>
    </div>
  </Provider>
)

export default hot(module)(Root)
