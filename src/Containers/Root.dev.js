import React, {Component} from 'react'
import {Provider} from 'react-redux'
import DevTool  from './DevTool'
import Sidebar from './Sidebar'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          <Sidebar />
          <DevTool />
        </div>
      </Provider>
    )
  }
}
