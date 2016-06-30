import React from 'react'
import DevTool  from '../../containers/DevTool'
import TaskContainer from '../../containers/TaskContainer'
import TaskInfoContainer from '../../containers/TaskInfoContainer'
import Sidebar from '../sidebar/Sidebar'
import TaskTrackerContainer from '../../containers/TaskTrackerContainer'
import './App.less'

const App = () => (
  <div className='app'>
    <Sidebar />
    <TaskContainer />
    <TaskInfoContainer />
    <TaskTrackerContainer />
    <DevTool />
  </div>
)

export default App
