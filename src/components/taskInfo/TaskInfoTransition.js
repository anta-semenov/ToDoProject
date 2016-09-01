import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import TaskInfo from './TaskInfo'
import { STANDART_SPRING } from '../../constants/defaults'
import './TaskInfoTransition.less'

const TaskInfoTransition = (props) => {
  const willEnter = () => ({ translateX: 100, opacity: 0 })
  const willLeave = () => ({ translateX: spring(100, STANDART_SPRING), opacity: spring(0, STANDART_SPRING) })
  const getStyle = () => ({ translateX: spring(0, STANDART_SPRING), opacity: spring(1, STANDART_SPRING) })

  return (
    <TransitionMotion
      willLeave={willLeave}
      willEnter={willEnter}
      styles={props.id ? [{ key: 'taskInfo', style: getStyle() }] : []}>
      {interpolatedStyles =>
        <div>
          {interpolatedStyles.map(({ key, style }) =>
            <div key={key} style={{opacity: style.opacity, transform: `translateX(${style.translateX}%)`}} className='task-info__transition'>
              <TaskInfo {...props}/>
            </div>
          )}
        </div>
      }
    </TransitionMotion>
  )
}

export default TaskInfoTransition
