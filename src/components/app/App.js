import React from 'react'
import TaskContainer from '../../containers/TaskContainer'
import TaskInfoContainer from '../../containers/TaskInfoContainer'
import Sidebar from '../sidebar/Sidebar'
import TaskTrackerContainer from '../../containers/TaskTrackerContainer'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import StatefulComponent from '../hoc/StatefulComponent'
import './App.less'

const App = () => (
  <div className='app'>
    <Sidebar />
    <TaskContainer />
    <TaskInfoContainer />
    <TaskTrackerContainer />
  </div>
)

let DragDropApp

if ('ontouchstart' in window && !('onmousedown' in window)) {
  DragDropApp = DragDropContext(TouchBackend)(StatefulComponent(App))
} else {
  DragDropApp = DragDropContext(HTML5Backend)(StatefulComponent(App))
}

export default DragDropApp
