import React, {Component} from 'react'
import {Provider} from 'react-redux'
import DevTool  from './DevTool'
import Sidebar from './Sidebar'
import TaskContainer from './TaskContainer'
import TaskInfoContainer from './TaskInfoContainer'
import Authentication from './AuthContainer'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          <Authentication />
          <Sidebar />
          <TaskContainer />
          <TaskInfoContainer />
          <DevTool />
        </div>
      </Provider>
    )
  }
}
