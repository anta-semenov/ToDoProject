import { fromJS } from 'immutable'
import * as sectionTypes from './sectionTypes'

export const NEW_CONTEXT_TITLE = 'New Context'

export const NEW_TASK_TITLE = 'New Task'

export const NEW_PROJECT_TITLE = 'New Project'

export const DEFAULT_SIDEBAR_SIZE = 220
export const DEFAULT_TASKINFO_SIZE = 480

export const INITIAL_UI_STATE = fromJS({
  selectedSection: {
    type: sectionTypes.INBOX
  }
})

export const DATE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export const ADD_NEW_CONTEXT_TITLE = 'Add context'
export const ADD_NEW_PROJECT_TITLE = 'Add project'

export const DATA_TYPES = ['task', 'project', 'context', 'tracking']

export const SOMEDAY_WAITING_PERIOD = 31*24*60*60*1000

export const STANDART_SPRING = { stiffness: 90, damping: 15}
