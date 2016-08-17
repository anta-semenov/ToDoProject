import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from '../components/app/App'
import DevTool  from './DevTool'
import Perf from 'react-addons-perf'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          <Router history={browserHistory}>
            <Route path='/(:section)(/:task)' component={App} />
          </Router>
          <DevTool />          
        </div>
      </Provider>
    )
  }
}
window.Perf = Perf
