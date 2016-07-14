import React from 'react'
import './Stopwatch.less'

const Stopwatch = ({ appearance = 'tasks-list', tracking = false, onClick }) => {
  return (
    <div className={`stopwatch--${appearance}${tracking ? ' is-tracking' : ''}`} onClick={() => onClick()}>
      <svg className={`stopwatch__svg--${appearance}${tracking ? ' is-tracking' : ''}`} width='18px' height='18px' viewBox='0 0 18 18' version='1.1' vectorEffect='non-scaling-stroke'>
        <g transform='translate(1.000000, 0.000000)'>
          <circle className='stopwatch__bezel' stroke='#000000' fill='none' strokeWidth='1' cx='9' cy='10' r='6'></circle>
          <g className='stopwatch__stopwatch'>
            <polygon fill='#000000' points='8 2.98944092 7 2.98944092 7.01660156 2 11 2 11 2.98944092 10 2.98944092 10 4.25482178 8 4.25482178'></polygon>
            <path fill='#000000' d='M9,5.45581055 C9.34204102,5.45581055 9.73310423,10.0430298 9.75054932,11 C9.75473391,11.2295507 9.5,11.4558105 9,11.4558105 C8.5,11.4558105 8.26983643,11.2215576 8.26983643,11 C8.26983643,10.0003052 8.65795898,5.45581055 9,5.45581055 Z'></path>
          </g>
          <g className='stopwatch__stop'>
            <rect x='6' y='7' width='6' height='6' rx='1' ry='1'></rect>
          </g>
          <g className='stopwatch__start'>
            <path d='M7,6.99703014 C7,6.4463856 7.37532687,6.25021791 7.83427429,6.55618286 L12.1657257,9.44381714 C12.6264827,9.75098845 12.6246731,10.2502179 12.1657257,10.5561829 L7.83427429,13.4438171 C7.37351732,13.7509885 7,13.5469637 7,13.0029699 L7,6.99703014 Z'></path>
          </g>
        </g>
      </svg>
    </div>
  )
}

Stopwatch.propTypes = {
  appearance: React.PropTypes.oneOf(['default', 'tasks-list']).isRequired,
  tracking: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default Stopwatch
