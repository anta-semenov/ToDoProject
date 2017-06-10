import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import StatefulComponent from '../hoc/StatefulComponent'
import Sidebar from '../sidebar/Sidebar'
import Navigation from '../../containers/Nav'
import Auth from '../../containers/AuthContainer'
import Section from '../../containers/Section'
import Task from '../../containers/TaskContainer'
import TaskTrackerContainer from '../../containers/TaskTrackerContainer'
import { INBOX } from '../../constants/sectionTypes'
import './App.less'

const App = ({ children, params }) => {
  const { section, task } = params
  return (
  <div className='app'>
    <Sidebar>
      <Auth />
      <Navigation section={section || INBOX} />
    </Sidebar>
    <Section section={section || INBOX} task={task} />
    <Task section={section || INBOX} task={task} />
    <TaskTrackerContainer />
    {children}
  </div>
)}

export default DragDropContext(HTML5Backend)(StatefulComponent(App))
