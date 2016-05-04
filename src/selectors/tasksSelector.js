import { createSelector } from 'reselect'
import { fromJS, Set } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'

export const getActiveItemID = state => state.getIn(['uiState', 'activeItem'], -1)
export const getSelectedSectionType = state => state.getIn(['uiState', 'selectedSection', 'type'])
export const getSelectedSectionID = state => state.getIn(['uiState', 'selectedSection', 'id'], -1)
const getCompletedLatentTasks = state => state.getIn(['uiState', 'sectionCompletedLatentTasks'], fromJS([]))
export const getTodayLatentTasks = state => state.getIn(['uiState', 'sectionTodayLatentTasks'], Set([]))
export const getAllTasks = state => state.get('task')
const getProjects = state => state.get('project')
const getContexts = state => state.get('context')

const getTasks = createSelector(
  [getAllTasks, getCompletedLatentTasks],
  (allTasks, latentTasks) => {
    return allTasks.filter(task => !task.get('completed') || latentTasks.includes(task.get('id')))
  }
)

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
  }).toList().sortBy(group => group.get('title'), (a, b) => a && b ? (a > b ? 1 : a < b ? -1 : 0) : (a ? 1 : -1))
}

export const getTasksGroups = createSelector(
  [getSelectedSectionType, getSelectedSectionID, getTasks, getTodayLatentTasks, getProjects],
  (sectionType, sectionID, tasks, todayLatentTasks, projects) => {
    switch (sectionType) {
      case sectionTypes.CONTEXT: {
        const sectionTasks = tasks.filter(task => {
          if (task.get('contexts')) {
            return task.get('contexts').includes(sectionID)
          }
          return false
        })
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.PROJECT: {
        const sectionTasks = tasks.filter(task => task.get('project') === sectionID)
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      case sectionTypes.TODAY: {
        const sectionTasks = tasks.filter(task => task.get('today') === true || todayLatentTasks.includes(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.NEXT: {
        return tasks.count() > 0 ? groupTasksByProject(tasks, projects) : undefined
      }

      case sectionTypes.INBOX: {
        const sectionTasks = tasks.filter(task => !task.get('today') && !task.has('project') && !task.has('contexts') || todayLatentTasks.includes(task.get('id')))
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
