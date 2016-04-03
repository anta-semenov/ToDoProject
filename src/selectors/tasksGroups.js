import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'

const getActiveItemType = state => state.getIn(['uiState', 'activeItem', 'type'])
const getActiveItemID = state => state.getIn(['uiState', 'activeItem', 'type'], -1)
const getSelectedSectionType = state => state.getIn(['uiState', 'selectedSection', 'type'])
const getSelectedSectionID = state => state.getIn(['uiState', 'selectedSection', 'type'], -1)
const getTasks = state => state.get('task')
const getProjects = state => state.get('project')

const getTasksGroups = createSelector(
  [getActiveItemType, getActiveItemID, getSelectedSectionType, getSelectedSectionID, getTasks, getProjects],
  (activeItemType, activeItemID, selectedSectionType, selectedSectionID, tasks, projects) => {
    switch (selectedSectionType) {
      case sectionTypes.PROJECT:
        return fromJS([{
          items: tasks.filter(task => task.get('project') === selectedSectionID)
        }])

      case sectionTypes.INBOX:
        return fromJS([{
          items: tasks.filter(task => !task.get('completed') && !task.get('today') && !task.get('project') && !task.get('contexts'))
        }])
      default:
        return fromJS([{items: tasks}])
    }
  }
)
export default getTasksGroups
