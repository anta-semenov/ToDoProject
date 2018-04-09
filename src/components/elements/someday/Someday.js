import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import Icon from '../icon/Icon'
import './Someday.less'

const Someday = ({
  appearance = 'default',
  checked = false,
  dimmed = false,
  disabled = false,
  onClick
}) => (
  <div
    className={cn(
      `someday someday--${appearance}`,
      dimmed && 'is-dimmed',
      disabled && 'is-disabled'
    )}
    onClick={() => onClick()}
  >
    <Icon
      name={checked ? 'someday-dark' : 'someday'}
      // name="someday"
      className={cn(`someday__icon someday__icon--${appearance}`, checked && 'is-checked')}
    />
  </div>
)

Someday.propTypes = {
  appearance: PropTypes.oneOf(['task-info', 'default']),
  checked: PropTypes.bool,
  dimmed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Someday
