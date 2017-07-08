import React from 'react'
import './TaskRepeat.less'
import RepeatIcon from './repeatIcon/RepeatIcon'
import RepeatTypeSelect from './repeatTypeSelect/RepeatTypeSelect'
import RepeatValueInput from './repeatValueInput/RepeatValueInput'
import {DEFAULT_REPEAT} from '../../../constants/defaults'

const TaskRepeat = ({repeat, onRepeatChange}) => {
  return (
    <div className='repeat'>
      <div className='repeat__title'>repeat</div>
      <div className='repeat__control'>
        <RepeatIcon
          onClick={() => onRepeatChange(repeat ? false : DEFAULT_REPEAT)}
          checked={!!repeat}
        />
        {
          !!repeat &&
          <div className='repeat__settings'>
            every
            <RepeatValueInput
              value={repeat.value}
              onChange={value => onRepeatChange({...repeat, value})}
            />
            <RepeatTypeSelect
              value={repeat.type}
              onChange={type => onRepeatChange({...repeat, type})}
            />
          </div>
        }
      </div>
    </div>
  )
}

TaskRepeat.propTypes = {
  repeat: React.PropTypes.object,
  onRepeatChange: React.PropTypes.func.isRequired
}

export default TaskRepeat
