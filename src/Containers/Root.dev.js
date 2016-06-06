import React, {Component} from 'react'
import {Provider} from 'react-redux'
import DevTool  from './DevTool'
import Navigation from './Sidebar'
import TaskContainer from './TaskContainer'
import TaskInfoContainer from './TaskInfoContainer'
import Auth from './AuthContainer'
import '../styles/App.less'
import '../styles/Sidebar.less'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <div className='app'>
          <div className='sidebar'>
            <Navigation />
            <Auth />
          </div>
          <TaskContainer />
          <TaskInfoContainer />
          <DevTool />
        </div>
      </Provider>
    )
  }
}
