import { fromJS } from 'immutable'
import { DATA_NONE } from './dataStatuses'

export const NEW_CONTEXT_TITLE = 'New Context'

export const NEW_TASK_TITLE = 'New Task'

export const NEW_PROJECT_TITLE = 'New Project'

export const DEFAULT_SIDEBAR_SIZE = 220
export const DEFAULT_TASKINFO_SIZE = 480

export const INITIAL_UI_STATE = fromJS({
  dataStatus: DATA_NONE
})
export const INITIAL_STATE = fromJS({
  task: {},
  project: {},
  context: {},
  tracking: {},
  order: {},
  uiState: INITIAL_UI_STATE
})

export const DATE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export const ADD_NEW_CONTEXT_TITLE = 'Add context'
export const ADD_NEW_PROJECT_TITLE = 'Add project'

export const DATA_TYPES = ['task', 'project', 'context', 'tracking', 'order']

export const SOMEDAY_WAITING_PERIOD = 90*24*60*60*1000

export const STANDART_SPRING = { stiffness: 210, damping: 24 }
