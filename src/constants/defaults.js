import { fromJS } from 'immutable'
import * as sectionTypes from './sectionTypes'

export const NEW_CONTEXT_TITLE = 'New Context'

export const NEW_TASK_TITLE = 'New Task'

export const NEW_PROJECT_TITLE = 'New Project'

export const DEFAULT_SIDEBAR_SIZE = '200px'

export const INITIAL_UI_STATE = fromJS({
  activeItem: {
    type: sectionTypes.INBOX
  }
})
