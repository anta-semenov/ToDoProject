import Navigation from '../components/navigation/Navigation'
import { connect } from 'react-redux'
import { setSelectedSection } from '../actions/uiStateActions'
import { BASIC, PROJECTS, CONTEXTS} from '../constants/navGroupTypes'
import { fromJS } from 'immutable'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'

const mapStateToProps = (state) => {
  const selectedSectionType = state.getIn(['uiState', 'selectedSection', 'type'])
  const selectedSectionID = state.getIn(['uiState', 'selectedSection', 'id'], -1)
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
      items: fromJS(state.get('context').map(item => {
        const id = item.get('id')
        return fromJS({
          id: id,
          type: sectionTypes.CONTEXT,
          title: item.get('title'),
          active: selectedSectionType === sectionTypes.CONTEXT && selectedSectionID === id ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && task.get('context', fromJS([])).has(id)).size
        })
      }))
    },
    {
      type: PROJECTS,
      title: sectionNames.PROJECTS,
      items: fromJS(state.get('project').map(item => {
        const id = item.get('id')
        return fromJS({
          id: id,
          type: sectionTypes.PROJECT,
          title: item.get('title'),
          active: selectedSectionType === sectionTypes.PROJECT && selectedSectionID === id ? true : false
        })
      }))
    }
  ]
  return {groups: groups}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (type, id) => {
      dispatch(setSelectedSection({type: type, id: id}))
    }
  }
}

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default Sidebar
