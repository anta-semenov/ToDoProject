import React from 'react'
import { INBOX, TODAY, NEXT, SOMEDAY, CONTEXT, PROJECT } from '../../../constants/sectionTypes'
import InboxImage from './inboxImage/InboxImage'
import './EmptyTaskList.less'

const EmptyTaskList = ({ sectionType = INBOX }) => {
  switch (sectionType) {
    case INBOX:
      return (
        <div className='empty-tasks'>
          <InboxImage />
          <div className='empty-tasks__text'>
            <p className='empty-tasks__text-lead'>Inbox is the best place to capture thoughts, plans, and ideas to classify them later.</p>
            <p className='empty-tasks__text-basic'>By the way, It's a good idea to clean your inbox at least once a week.</p>
          </div>
        </div>
      )
    default:
      return (
        <div />
      )
  }

}

EmptyTaskList.propTypes = {
  sectionType: React.PropTypes.oneOf([INBOX, TODAY, NEXT, SOMEDAY, CONTEXT, PROJECT])
}
export default EmptyTaskList
