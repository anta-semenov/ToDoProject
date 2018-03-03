import Navigation from '../components/navigation/Navigation'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setEditingSection, clearLatentTasks } from '../actions/uiStateActions'
import { addProject, editProject, changeProjectPosition } from '../actions/projectActions'
import { addContext, editContext, changeContextPosition } from '../actions/contextActions'
import * as sectionTypes from '../constants/sectionTypes'
import uniqueKey from '../utils/uniqueKeyGenerator'
import { getDataStatus, getAuthStatus, getNavGroups } from '../reducer'

export const mapStateToProps = (state, ownProps) => ({
  dataStatus: getDataStatus(state),
  authStatus: getAuthStatus(state),
  groups: getNavGroups(state, ownProps)
})

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
