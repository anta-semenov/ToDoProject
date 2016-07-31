import { createSelector } from 'reselect'
import { fromJS, Map, Set, List } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import { PRIORITY } from '../constants/priorityLevels'
import { getOrderedProjectsList } from '../reducer/index'

export const getActiveItemID = state => state.getIn(['uiState', 'activeItem'], '')
export const getSelectedSectionType = state => state.getIn(['uiState', 'selectedSection', 'type'])
export const getSelectedSectionID = state => state.getIn(['uiState', 'selectedSection', 'id'], '')
export const getLatentTasks = state => state.getIn(['uiState', 'sectionLatentTasks'], Map())
export const getAllTasks = state => state.get('task', Map()).toList()

//Helper functions
const groupTasksByProject = (tasks, projects) => {
  const groupedTasks = tasks.groupBy(task => task.get('project'))
  const result = List().asMutable()
  let index = 0
  if (groupedTasks.get(undefined)) {
    result.set(index, fromJS({items: groupedTasks.get(undefined)}))
    index++
  }
  projects.forEach((item) => {
    const projectTasks = groupedTasks.get(item.get('id'))
    if (projectTasks) {
      result.set(index, fromJS({
        title: item.get('title'),
        items: projectTasks
      }))
      index++
    }
  })
  return result.asImmutable()
}

// Composable selectors
const getTasks = createSelector(
  [getAllTasks, getLatentTasks],
  (allTasks, latentTasks) => allTasks.filter(task => (!task.get('completed', false) || latentTasks.has(task.get('id'))) && !task.get('deleted', false)).sort((a, b) => {
    return  PRIORITY.indexOf(a.get('priority')) > PRIORITY.indexOf(b.get('priority')) ? -1 :
            PRIORITY.indexOf(a.get('priority')) < PRIORITY.indexOf(b.get('priority')) ? 1 :
            a.get('id') > b.get('id') ? 1 :
            a.get('id') < b.get('id') ? -1 : 0
  })
)

export const getTasksGroups = createSelector(
  [getSelectedSectionType, getSelectedSectionID, getTasks, getLatentTasks, getOrderedProjectsList],
  (sectionType, sectionID, tasks, latentTasks, projects) => {
    switch (sectionType) {
      case sectionTypes.CONTEXT: {
        const sectionTasks = tasks.filter(task => task.get('contexts', Set()).includes(sectionID) || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.PROJECT: {
        const sectionTasks = tasks.filter(task => task.get('project') === sectionID || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      case sectionTypes.TODAY: {
        const sectionTasks = tasks.filter(task => task.get('today') === true || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.NEXT: {
        const sectionTasks = tasks.filter(task => !task.get('someday', false) || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.INBOX: {
        const sectionTasks = tasks.filter(task => !task.get('today') && !task.has('project') && !task.get('someday', false) && !task.has('contexts') || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      case sectionTypes.SOMEDAY: {
        const sectionTasks = tasks.filter(task => !task.get('today') && task.get('someday', false) || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      default:
        return fromJS([{items: tasks}])
    }
  }
)
