import PropTypes from 'prop-types';
import React from 'react'
import './RepeatTypeSelect.less'
import {DAYS, WEEKS, MONTHS} from '../../../../constants/repeatTypes'

const RepeatTypeSelect = ({value, onChange}) => (
  <select
    className='repeat-type'
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value={DAYS}>days</option>
    <option value={WEEKS}>weeks</option>
    <option value={MONTHS}>months</option>
  </select>
)

RepeatTypeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default RepeatTypeSelect
