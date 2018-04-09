import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './Icon.less'

const iconPaths = {
  someday:
    'M28,10.5 L28,26 C28,27.6568542 26.6568542,29 25,29 L5,29 C3.34314575,29 2,27.6568542 2,26 L2,10.5 L1,10.5 C0.44771525,10.5 6.76353751e-17,10.0522847 0,9.5 L0,4 C-1.3527075e-16,2.8954305 0.8954305,2 2,2 L28,2 C29.1045695,2 30,2.8954305 30,4 L30,9.5 C30,10.0522847 29.5522847,10.5 29,10.5 L28,10.5 Z M3.5,10.5 L3.5,26 C3.5,26.8284271 4.17157288,27.5 5,27.5 L25,27.5 C25.8284271,27.5 26.5,26.8284271 26.5,26 L26.5,10.5 L3.5,10.5 Z M1.5,9 L28.5,9 L28.5,4 C28.5,3.72385763 28.2761424,3.5 28,3.5 L2,3.5 C1.72385763,3.5 1.5,3.72385763 1.5,4 L1.5,9 Z M11,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z',
  'someday-dark':
    'M28,11.5 L28,26 C28,27.6568542 26.6568542,29 25,29 L5,29 C3.34314575,29 2,27.6568542 2,26 L2,11.5 C2,10.9477153 2.44771525,10.5 3,10.5 L27,10.5 C27.5522847,10.5 28,10.9477153 28,11.5 Z M29,9.00488281 L1,9.00488281 C0.44771525,9.00488281 6.76353751e-17,8.55716756 0,8.00488281 L0,4 C-1.3527075e-16,2.8954305 0.8954305,2 2,2 L28,2 C29.1045695,2 30,2.8954305 30,4 L30,8.00488281 C30,8.55716756 29.5522847,9.00488281 29,9.00488281 Z M11,16 C10.4477153,16 10,16.4477153 10,17 L10,19 C10,19.5522847 10.4477153,20 11,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,17 C20,16.4477153 19.5522847,16 19,16 L11,16 Z'
}

const Icon = ({ name, className }) => (
  <svg className={cn('icon', className)} viewBox="0 0 30 30">
    <title>{name}</title>
    <path d={iconPaths[name]} />
  </svg>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon
