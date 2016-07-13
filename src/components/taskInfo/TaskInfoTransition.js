import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import TaskInfo from './TaskInfo'
import { DEFAULT_TASKINFO_SIZE, STANDART_SPRING } from '../../constants/defaults'

const TaskInfoTransition = (props) => {
  const willEnter = () => ({ width: 0, opacity: 0 })
  const willLeave = () => ({ width: spring(0, STANDART_SPRING), opacity: spring(0, STANDART_SPRING) })
  const getStyle = () => ({ width: spring(DEFAULT_TASKINFO_SIZE, STANDART_SPRING), opacity: spring(1, STANDART_SPRING) })

  return (
    <TransitionMotion
      willLeave={willLeave}
      willEnter={willEnter}
      styles={props.id ? [{ key: 'taskInfo', style: getStyle() }] : []}>
      {interpolatedStyles =>
        <div>
          {interpolatedStyles.map(({ key, style }) =>
            <div key={key} style={style}>
              <TaskInfo {...props}/>
            </div>
          )}
        </div>
      }
    </TransitionMotion>
  )
}


export default TaskInfoTransition
