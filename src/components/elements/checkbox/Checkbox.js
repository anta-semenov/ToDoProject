import React from 'react'
import './Checkbox.less'

const Checkbox = ({ appearance, dimmed, checked, onChange }) =>
  <div className={`checkbox checkbox--${appearance}${dimmed ? ' is-dimmed' : ''}${checked ? ' is-active' : ''}`} onClick={() => onChange()}>
    <div className='checkbox__checkmark'>
      <svg viewBox='0 0 17 14'>
        <path d='M15.0328152,0.000721764681 C13.8445596,0.691568051 12.2970639,2.12852833 11.2746114,3.04044543 C9.22970639,4.86427962 7.26770294,6.77101537 5.33333333,8.70538498 L1.46459413,5.3340551 L-1.5720758e-13,6.77101537 C2.12780656,8.89882194 4.42141623,11.1924316 6.30051813,13.5689428 C8.70466321,9.61730208 12.6286701,3.95236252 16,0.967906566 C15.8894646,0.746835754 15.4196891,-0.0269120868 15.0328152,0.000721764681 Z' ></path>
      </svg>
    </div>
    <div className='checkbox__border'>
      <svg id='circle' viewBox='0 0 26 26' >
        <circle cx='13' cy='13' r='11' fill='none' />
      </svg>
    </div>
    <div className='checkbox__background'>
      <svg id='circle' viewBox='0 0 26 26' >
        <circle cx='13' cy='13' r='11' />
      </svg>
    </div>
  </div>

Checkbox.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default', 'section-header']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  appearance: 'default',
  checked: false,
  dimmed: false
}

export default Checkbox
