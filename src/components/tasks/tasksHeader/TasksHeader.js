import React from 'react'
import { PROJECT, CONTEXT } from '../../../constants/sectionTypes.js'
import Textfield from '../../elements/textfield/Textfield'
import './TasksHeader.less'

const headerPlaceholder = (sectionType) => {
  switch (sectionType) {
    case PROJECT:
      return 'Project name'
    case CONTEXT:
      return 'Context name'
  }
}

const TasksHeader = ({ sectionName, sectionType, onNameChange, onDelete }) => {
  return (
    <div className='tasks-header'>
      {sectionType === PROJECT || sectionType === CONTEXT ?
        <Textfield appearance='section-header' text={sectionName} onChange={onNameChange} placeholder={headerPlaceholder(sectionType)} /> :
        <h1 className='tasks-header__title'>{sectionName}</h1>
      }
      {sectionType === PROJECT || sectionType === CONTEXT ?
        <div className='tasks-header__delete' onClick={() => onDelete()}>
          <svg width='16px' viewBox='0 0 26 32' version='1.1' xmlns='http://www.w3.org/2000/svg' >
            <g id="trash" fill="#FF6666">
              <rect id="Rectangle-path" x="8" y="10" width="2" height="16"></rect>
              <rect id="Rectangle-path" x="12" y="10" width="2" height="16"></rect>
              <rect id="Rectangle-path" x="16" y="10" width="2" height="16"></rect>
              <rect id="Rectangle-path" x="0" y="4" width="26" height="2"></rect>
              <path d="M17.9,5 L16,5 L16,3 C16,2.4 15.5,1.9 14.9,1.9 L10.9,1.9 C10.3,1.9 9.8,2.4 9.8,3 L9.8,5 L7.9,5 L7.9,3 C7.9,1.4 9.2,0.1 10.8,0.1 L14.8,0.1 C16.4,0.1 17.7,1.4 17.7,3 L17.7,5 L17.9,5 Z" id="Shape"></path>
              <path d="M19,32 L7,32 C5.4,32 4,30.7 3.8,29.1 L2,5.1 L4,4.9 L5.8,28.9 C5.8,29.5 6.4,30 7,30 L19,30 C19.6,30 20.1,29.5 20.2,28.9 L22,4.9 L24,5.1 L22.2,29.1 C22,30.7 20.6,32 19,32 L19,32 Z" id="Shape"></path>
            </g>
          </svg>
        </div> :
        null
      }
    </div>
  )
}

TasksHeader.propTypes = {
  sectionName: React.PropTypes.string.isRequired,
  sectionType: React.PropTypes.string.isRequired,
  onNameChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired
}

export default TasksHeader
