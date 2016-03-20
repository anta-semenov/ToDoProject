import * as actionTypes from '../constants/actionTypes'
import * as sectionTypes from '../constants/sectionTypes'
import { fromJS } from 'immutable'


export default function uiState(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SECTION:
      return setSection(state, action.section)
    default:
    return state
  }
}

function setSection(state, section) {
  if (section) {
    return state.set('selectedSection', fromJS(section))
  }
  else {
    return state.delete('selectedSection')
  }
}
