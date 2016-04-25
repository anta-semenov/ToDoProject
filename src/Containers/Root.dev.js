import React, {Component} from 'react'
import {Provider} from 'react-redux'
import DevTool  from './DevTool'
import Sidebar from './Sidebar'
import TaskContainer from './TaskContainer'
import TaskInfoContainer from './TaskInfoContainer'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          <Sidebar />
          <TaskContainer />
          <TaskInfoContainer />
          <DevTool />
        </div>
      </Provider>
    )
  }
}
