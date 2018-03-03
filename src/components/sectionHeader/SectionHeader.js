import PropTypes from 'prop-types';
import React from 'react'
import { PROJECT, CONTEXT, INBOX, TODAY, NEXT, SOMEDAY } from '../../constants/sectionTypes.js'
import Textfield from '../elements/textfield/Textfield'
import Checkbox from '../elements/checkbox/Checkbox'
import './SectionHeader.less'

const headerPlaceholder = (sectionType) => {
  switch (sectionType) {
    case PROJECT:
      return 'New Project'
    case CONTEXT:
      return 'New Context'
  }
}

const SectionHeader = ({
  sectionName,
  sectionType,
  isSectionComplete = false,
  onSectionNameChange,
  onSectionDelete,
  onSectionComplete }) => {
  return (
    <div className='section-header'>
      {sectionType === PROJECT ?
        <Checkbox appearance='section-header' checked={isSectionComplete} onChange={onSectionComplete} /> :
        null
      }
      {sectionType === PROJECT || sectionType === CONTEXT ?
        <Textfield
          appearance='section-header'
          text={sectionName}
          onChange={onSectionNameChange}
          placeholder={headerPlaceholder(sectionType)}
        /> :
        <h1 className='section-header__title'>{sectionName}</h1>
      }
      {sectionType === PROJECT || sectionType === CONTEXT ?
        <div className='section-header__delete' onClick={() => onSectionDelete()}>
          <svg className='section-header__delete-icon' viewBox='0 0 17 20' version='1.1' >
            <path d='M3,3 L2,3 L2,17.9998938 C2,19.1099416 2.89666625,20 4.00276013,20 L12.9972399,20 C14.1064574,20 15,19.104522 15,17.9998938 L15,3 L14,3 L14,18.0066023 C14,18.5552407 13.555163,19 13.0044225,19 L3.9955775,19 C3.44573523,19 3,18.5550537 3,18.0066023 L3,3 L3,3 Z' id='Path'></path>
            <polygon id='Path' points='11 5 12 5 12 17 11 17'></polygon>
            <polygon id='Path' points='8 5 9 5 9 17 8 17'></polygon>
            <polygon id='Path' points='5 5 6 5 6 17 5 17'></polygon>
            <polygon id='Path' points='0 2 17 2 17 3 0 3'></polygon>
            <path d='M10,2 L11,2 L11,1 C11,0.443864822 10.5523709,0 10.0001925,0 L6.99980749,0 C6.44371665,0 6,0.44771525 6,1 L6,2 L7,2 L7,1 L10,1 L10,2 L10,2 Z' id='trash-icon'></path>
          </svg>
        </div> :
        null
      }
    </div>
  )
}

SectionHeader.propTypes = {
  sectionName: PropTypes.string.isRequired,
  sectionType: PropTypes.oneOf([PROJECT, CONTEXT, INBOX, TODAY, NEXT, SOMEDAY]).isRequired,
  isSectionComplete: PropTypes.bool,
  isSectionEmpty: PropTypes.bool,

  onSectionNameChange: PropTypes.func.isRequired,
  onSectionDelete: PropTypes.func.isRequired,
  onSectionComplete: PropTypes.func.isRequired
}

SectionHeader.defaultProps = {
  isSectionComplete: false
}

export default SectionHeader
