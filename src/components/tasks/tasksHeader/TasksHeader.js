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
        <Textfield appearance='section-header' initialText={sectionName} onChange={onNameChange} placeholder={headerPlaceholder(sectionType)} /> :
        <h1 className='tasks-header__title'>{sectionName}</h1>
      }
      {sectionType === PROJECT || sectionType === CONTEXT ?
        <div className='tasks-header__delete' onClick={() => onDelete()}>
          <svg width='16px' viewBox='0 0 26 32' version='1.1' xmlns='http://www.w3.org/2000/svg' ><path d='M2.0675,6 L0,6 L0,4 L7.9,4 L7.9,3 C7.9,1.4 9.2,0.1 10.8,0.1 L14.8,0.1 C16.4,0.1 17.7,1.4 17.7,3 L17.7,4 L26,4 L26,6 L23.9325,6 L22.2,29.1 C22,30.7 20.6,32 19,32 L7,32 C5.4,32 4,30.7 3.8,29.1 L2.0675,6 Z M4.0825,6 L21.9175,6 L20.2,28.9 C20.1,29.5 19.6,30 19,30 L7,30 C6.4,30 5.8,29.5 5.8,28.9 L4.0825,6 Z M9.8,4 L16,4 L16,3 C16,2.4 15.5,1.9 14.9,1.9 L10.9,1.9 C10.3,1.9 9.8,2.4 9.8,3 L9.8,4 Z M8,10 L10,10 L10,26 L8,26 L8,10 Z M12,10 L14,10 L14,26 L12,26 L12,10 Z M16,10 L18,10 L18,26 L16,26 L16,10 Z' id='trash' /></svg>
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
