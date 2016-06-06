import { fromJS } from 'immutable'
import * as sectionTypes from './sectionTypes'
import { AUTH_NONE } from './authStatus.js'

export const NEW_CONTEXT_TITLE = 'New Context'

export const NEW_TASK_TITLE = 'New Task'

export const NEW_PROJECT_TITLE = 'New Project'

export const DEFAULT_SIDEBAR_SIZE = '200px'

export const INITIAL_UI_STATE = fromJS({
  selectedSection: {
    type: sectionTypes.INBOX
  },
  authStatus: AUTH_NONE
})

export const DATE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export const ADD_NEW_CONTEXT_TITLE = '+ context'
export const ADD_NEW_PROJECT_TITLE = '+ project'
