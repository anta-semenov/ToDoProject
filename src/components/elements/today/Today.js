import React from 'react'
import classNames from 'classnames'
import './Today.less'

const Today = ({ appearance = 'default', checked = false, dimmed = false, disabled = false, onClick }) => {
  const todayClasses = classNames({
    'today': true,
    [`today--${appearance}`]: true,
    'is-checked': checked,
    'is-dimmed': dimmed,
    'is-disabled': disabled
  })
  return (
    <div
      className={todayClasses}
      onClick={() => onClick()}
    >
      <svg className='today__svg' viewBox='0 0 26 26' >
        <circle className='today__beams' cx='13' cy='13' r='13' fill='none' />
        <circle className='today__beams--active' cx='13' cy='13' r='13' fill='none' />
      </svg>
    </div>
  )
}

Today.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default Today
