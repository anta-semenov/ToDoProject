import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'

const getActiveItemType = state => state.getIn(['uiState', 'activeItem', 'type'])
const getActiveItemID = state => state.getIn(['uiState', 'activeItem', 'type'], -1)
export const getSelectedSectionType = state => state.getIn(['uiState', 'selectedSection', 'type'])
export const getSelectedSectionID = state => state.getIn(['uiState', 'selectedSection', 'id'], -1)
const getTasks = state => state.get('task')
const getProjects = state => state.get('project')
const getContexts = state => state.get('context')

//Helper functions
const groupTasksByProject = (tasks, projects) => {
  const groupedTasks = tasks.groupBy(task => task.get('project'))
  return groupedTasks.map((tasks, projectID) => {
    const projectIndex = projects.findIndex(project => project.get('id') === projectID)
    if (projectIndex >= 0 ) {
      return fromJS({
        title: projects.getIn([projectIndex, 'title'], undefined),
        items: tasks
      })
    }
    return fromJS({items: tasks})
  }).toList()
}

export const getTasksGroups = createSelector(
  [getActiveItemType, getActiveItemID, getSelectedSectionType, getSelectedSectionID, getTasks, getProjects],
  (activeItemType, activeItemID, sectionType, sectionID, tasks, projects) => {
    switch (sectionType) {
      case sectionTypes.CONTEXT: {
        const sectionTasks = tasks.filter(task => {
          if (task.get('contexts')) {
            return task.get('contexts').includes(sectionID)
          }
          return undefined
        })
        return groupTasksByProject(sectionTasks, projects)
      }

      case sectionTypes.PROJECT: {
        const sectionTasks = tasks.filter(task => task.get('project') === sectionID)
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      case sectionTypes.TODAY: {
        const sectionTasks = tasks.filter(task => task.get('today') === true)
        return groupTasksByProject(sectionTasks, projects)
      }

      case sectionTypes.NEXT: {
        const sectionTasks = tasks.filter(task => !task.get('completed'))
        return groupTasksByProject(sectionTasks, projects)
      }

      case sectionTypes.INBOX: {
        const sectionTasks = tasks.filter(task => /*!task.get('completed') &&*/ !task.get('today') && !task.has('project') && !task.has('contexts'))
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      default:
        return fromJS([{items: tasks}])
    }
  }
)

export const getSectionName = createSelector(
  [getSelectedSectionType, getSelectedSectionID, getProjects, getContexts],
  (sectionType, sectionID, projects, contexts) => {
    switch (sectionType) {
      case sectionTypes.PROJECT:{
        const projectIndex = projects.findIndex(project => project.get('id') === sectionID)
        return projects.getIn([projectIndex, 'title'], undefined)
      }

      case sectionTypes.CONTEXT: {
        const contextIndex = contexts.findIndex(context => context.get('id') === sectionID)
        return contexts.getIn([contextIndex, 'title'], undefined)
      }

      case sectionTypes.INBOX:
        return sectionNames.INBOX

      case sectionTypes.TODAY:
        return sectionNames.TODAY

      case sectionTypes.NEXT:
        return sectionNames.NEXT
    }
  }
)
