import Navigation from '../components/navigation/Navigation'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setEditingSection, clearLatentTasks } from '../actions/uiStateActions'
import { addProject, editProject, changeProjectPosition } from '../actions/projectActions'
import { addContext, editContext, changeContextPosition } from '../actions/contextActions'
import { BASIC, PROJECTS, CONTEXTS} from '../constants/navGroupTypes'
import { fromJS } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'
import uniqueKey from '../utils/uniqueKeyGenerator'
import { ADD_NEW_CONTEXT_TITLE, ADD_NEW_PROJECT_TITLE } from '../constants/defaults'
import { getOrderedProjectsList, getOrderedContextsList, getDataStatus, getAuthStatus } from '../reducer'

export const mapStateToProps = (state, ownProps) => {
  const editingSectionType = state.getIn(['uiState', 'editingSection', 'type'])
  const editingSectionID = state.getIn(['uiState', 'editingSection', 'id'])

  const groups = [
    {
      type: BASIC,
      items: fromJS([
        {
          type: sectionTypes.INBOX,
          title: sectionNames.INBOX,
          active: ownProps.section === sectionTypes.INBOX ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && !task.get('today') && !task.get('someday') && !task.has('project') && !task.has('contexts') && !task.get('deleted')).size
        },
        {
          type: sectionTypes.TODAY,
          title: sectionNames.TODAY,
          active: ownProps.section === sectionTypes.TODAY ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && !task.get('deleted') && task.get('today')).size
        },
        {
          type: sectionTypes.NEXT,
          title: sectionNames.NEXT,
          active: ownProps.section === sectionTypes.NEXT ? true : false
        },
        {
          type: sectionTypes.SOMEDAY,
          title: sectionNames.SOMEDAY,
          active: ownProps.section === sectionTypes.SOMEDAY ? true : false
        }
      ])
    },
    {
      type: CONTEXTS,
      title: sectionNames.CONTEXTS,
      addNewTitle: ADD_NEW_CONTEXT_TITLE,
      items: getOrderedContextsList(state).map((item) => {
        const id = item.get('id')
        return fromJS({
          id: id,
          type: sectionTypes.CONTEXT,
          title: item.get('title'),
          active: ownProps.section === id ? true : false,
          editing: editingSectionType === sectionTypes.CONTEXT && editingSectionID === id ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && !task.get('deleted') && task.get('context', fromJS([])).has(id)).size
        })
      })
    },
    {
      type: PROJECTS,
      title: sectionNames.PROJECTS,
      addNewTitle: ADD_NEW_PROJECT_TITLE,
      items: getOrderedProjectsList(state).map((item) => {
        const id = item.get('id')
        return fromJS({
          id: id,
          type: sectionTypes.PROJECT,
          title: item.get('title'),
          active: ownProps.section === id ? true : false,
          editing: editingSectionType === sectionTypes.PROJECT && editingSectionID === id ? true : false
        })
      })
    }
  ]
  return {
    dataStatus: getDataStatus(state),
    authStatus: getAuthStatus(state),
    groups: groups
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (type, id) => {
      dispatch(clearLatentTasks())
      browserHistory.push(`/${id ? id : type}`)
    },
    addNew: (type) => {
      const newKey = uniqueKey()
      switch (type) {
        case sectionTypes.PROJECTS:
          dispatch(addProject({id: newKey}))
          dispatch(setEditingSection({
            type: sectionTypes.PROJECT,
            id: newKey
          }))
          break
        case sectionTypes.CONTEXTS:
          dispatch(addContext({id: newKey}))
          dispatch(setEditingSection({
            type: sectionTypes.CONTEXT,
            id: newKey
          }))
          break
      }
    },
    onStopEditing: (item) => {
      dispatch(setEditingSection())
      if (item.newTitle) {
        const properties = {title: item.newTitle}
        switch (item.type) {
          case sectionTypes.PROJECT:
            dispatch(editProject(item.id, properties))
            break
          case sectionTypes.CONTEXT:
            dispatch(editContext(item.id, properties))
            break
        }
      }
    },
    changePosition: (type, id, nextId) => {
      switch (type) {
        case sectionTypes.PROJECT:
          dispatch(changeProjectPosition(id, nextId))
          break
        case sectionTypes.CONTEXT:
          dispatch(changeContextPosition(id, nextId))
          break
      }
    }
  }
}

const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default Nav
