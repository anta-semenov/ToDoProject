import Navigation from '../components/navigation/Navigation'
import { connect } from 'react-redux'
import { setSelectedSection, setEditingSection } from '../actions/uiStateActions'
import { addProject, editProject } from '../actions/projectActions'
import { addContext, editContext } from '../actions/contextActions'
import { BASIC, PROJECTS, CONTEXTS} from '../constants/navGroupTypes'
import { fromJS } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'
import { makeNextIDSelector } from '../selectors/nextID'

const mapStateToProps = (state) => {
  const selectedSectionType = state.getIn(['uiState', 'selectedSection', 'type'])
  const selectedSectionID = state.getIn(['uiState', 'selectedSection', 'id'], -1)
  const editingSectionType = state.getIn(['uiState', 'editingSection', 'type'])
  const editingSectionID = state.getIn(['uiState', 'editingSection', 'id'])

  const groups = [
    {
      type: BASIC,
      items: fromJS([
        {
          type: sectionTypes.INBOX,
          title: sectionNames.INBOX,
          active: selectedSectionType === sectionTypes.INBOX ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && !task.get('today') && !task.get('project') && !task.get('contexts')).size
        },
        {
          type: sectionTypes.TODAY,
          title: sectionNames.TODAY,
          active: selectedSectionType === sectionTypes.TODAY ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && task.get('today')).size
        },
        {
          type: sectionTypes.NEXT,
          title: sectionNames.NEXT,
          active: selectedSectionType === sectionTypes.NEXT ? true : false
        }
      ])
    },
    {
      type: CONTEXTS,
      title: sectionNames.CONTEXTS,
      addNewTitle: '+ context',
      items: fromJS(state.get('context').map(item => {
        const id = item.get('id')
        return fromJS({
          id: id,
          type: sectionTypes.CONTEXT,
          title: item.get('title'),
          active: selectedSectionType === sectionTypes.CONTEXT && selectedSectionID === id ? true : false,
          editing: editingSectionType === sectionTypes.CONTEXT && editingSectionID === id ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && task.get('context', fromJS([])).has(id)).size
        })
      }))
    },
    {
      type: PROJECTS,
      title: sectionNames.PROJECTS,
      addNewTitle: '+ project',
      items: fromJS(state.get('project').map(item => {
        const id = item.get('id')
        return fromJS({
          id: id,
          type: sectionTypes.PROJECT,
          title: item.get('title'),
          active: selectedSectionType === sectionTypes.PROJECT && selectedSectionID === id ? true : false,
          editing: editingSectionType === sectionTypes.PROJECT && editingSectionID === id ? true : false
        })
      }))
    }
  ]

  return {
    groups: groups,
    nextProjectID: makeNextIDSelector()(state.get('project')),
    nextContextID: makeNextIDSelector()(state.get('context'))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (type, id) => {
      dispatch(setSelectedSection({type: type, id: id}))
    },
    addNew: (type, nextProjectID, nextContextID) => {
      switch (type) {
        case sectionTypes.PROJECTS:
          dispatch(addProject({id: nextProjectID}))
          dispatch(setEditingSection({
            type: sectionTypes.PROJECT,
            id: nextProjectID
          }))
          break
        case sectionTypes.CONTEXTS:
          dispatch(addContext({id: nextContextID}))
          dispatch(setEditingSection({
            type: sectionTypes.CONTEXT,
            id: nextContextID
          }))
          break
        default:

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
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, {
    onItemClick: dispatchProps.onItemClick,
    addNew: (type) => dispatchProps.addNew(type, stateProps.nextProjectID, stateProps.nextContextID),
    onStopEditing: dispatchProps.onStopEditing
  })
}

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Navigation)

export default Sidebar
