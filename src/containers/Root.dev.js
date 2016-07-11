import React, {Component} from 'react'
import {Provider} from 'react-redux'
import App from '../components/app/App'
import DevTool  from './DevTool'
import Perf from 'react-addons-perf'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          <App />
          <DevTool />
        </div>
      </Provider>
    )
  }
}
window.Perf = Perf