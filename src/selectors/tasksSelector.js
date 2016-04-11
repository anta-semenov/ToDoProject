import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'

const getActiveItemType = state => state.getIn(['uiState', 'activeItem', 'type'])
const getActiveItemID = state => state.getIn(['uiState', 'activeItem', 'type'], -1)
const getSelectedSectionType = state => state.getIn(['uiState', 'selectedSection', 'type'])
const getSelectedSectionID = state => state.getIn(['uiState', 'selectedSection', 'id'], -1)
const getTasks = state => state.get('task')
const getProjects = state => state.get('project')
const getContexts = state => state.get('context')

//Helper functions
const groupTasksByProject = (tasks, projects) => {
  return projects.map(project => {
    const filteredTasks = tasks.filter(task => task.get('project') === project.get('id'))
    if (filteredTasks.count() > 0) {
      return fromJS({
        title: project.get('title'),
        items: filteredTasks
      })
    }
    return undefined
  })
}

export const getTasksGroups = createSelector(
  [getActiveItemType, getActiveItemID, getSelectedSectionType, getSelectedSectionID, getTasks, getProjects, getContexts],
  (activeItemType, activeItemID, sectionType, sectionID, tasks, projects) => {
    switch (sectionType) {
      case sectionTypes.CONTEXT: {
        const sectionTasks = tasks.filter(task => {
          if (task.get('context')) {
            return task.get('context').includes(sectionID)
          }
          return undefined
        })
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.PROJECT: {
        const sectionTasks = tasks.filter(task => task.get('project') === sectionID)
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      case sectionTypes.TODAY: {
        const projectTasks = tasks.filter(task => task.has('project'))
        const projectTasksGroup = projectTasks.count() > 0 ? groupTasksByProject(projectTasks, projects) : undefined

        const noProjectTasks = tasks.filterNot(task => task.has('project'))
        const noProjectTasksGroup = noProjectTasks.count() > 0 ? fromJS([{items: noProjectTasks}]) : undefined

        return noProjectTasksGroup ? noProjectTasksGroup.merge(projectTasksGroup) : projectTasksGroup
      }

      case sectionTypes.NEXT: {
        const projectTasks = tasks.filter(task => task.has('project'))
        const projectTasksGroup = projectTasks.count() > 0 ? groupTasksByProject(projectTasks, projects) : undefined

        const noProjectTasks = tasks.filterNot(task => task.has('project'))
        const noProjectTasksGroup = noProjectTasks.count() > 0 ? fromJS([{items: noProjectTasks}]) : undefined

        return noProjectTasksGroup ? noProjectTasksGroup.merge(projectTasksGroup) : projectTasksGroup
      }

      case sectionTypes.INBOX: {
        const sectionTasks = tasks.filter(task => !task.get('completed') && !task.get('today') && !task.get('project') && !task.get('contexts'))
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
