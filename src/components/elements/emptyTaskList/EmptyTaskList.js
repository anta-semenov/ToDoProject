import PropTypes from 'prop-types';
import React from 'react'
import { INBOX, TODAY, NEXT, SOMEDAY, CONTEXT, PROJECT } from '../../../constants/sectionTypes'
import InboxImage from '../inboxImage/InboxImage'
import NextImage from '../nextImage/NextImage'
import SomedayImage from '../somedayImage/SomedayImage'
import ProjectImage from '../projectImage/ProjectImage'
import './EmptyTaskList.less'

const EmptyTaskList = ({ sectionType = INBOX }) => {
  switch (sectionType) {
    case INBOX:
      return (
        <div className='empty-tasks'>
          <InboxImage />
          <div className='empty-tasks__text' id='inbox-empty-state'>
            <p className='empty-tasks__text-lead'>Inbox is the best place to capture thoughts, plans, and ideas to classify them later.</p>
            <p className='empty-tasks__text-basic'>By the way, It's a good idea to clean your inbox at least once a week.</p>
          </div>
        </div>
      )
    case NEXT:
      return (
        <div className='empty-tasks'>
          <NextImage />
          <div className='empty-tasks__text' id='next-empty-state'>
            <p className='empty-tasks__text-lead'>Inbox is the best place to capture thoughts, plans, and ideas to classify them later.</p>
            <p className='empty-tasks__text-basic'>By the way, It's a good idea to clean your inbox at least once a week.</p>
          </div>
        </div>
      )
    case SOMEDAY:
      return (
        <div className='empty-tasks'>
          <SomedayImage />
          <div className='empty-tasks__text' id='someday-empty-state'>
            <p className='empty-tasks__text-lead'>Save tasks in Someday if you're not going to work on it in the near future.</p>
            <p className='empty-tasks__text-basic'>In a while, it will appear in your inbox so you can reconsider or rethink it.</p>
          </div>
        </div>
      )
    case PROJECT:
      return (
        <div className='empty-tasks'>
          <ProjectImage />
          <div className='empty-tasks__text' id='project-empty-state'>
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
  sectionType: PropTypes.oneOf([INBOX, TODAY, NEXT, SOMEDAY, CONTEXT, PROJECT])
}
export default EmptyTaskList
