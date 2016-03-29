import Navigation from '../navigation/Navigation'
import { connect } from 'react-redux'
import { setActiveItem } from '../../actions/uiStateAction'
import { BASIC, PROJECTS, CONTEXTS} from '../../constants/navGroupTypes'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../constants/sectionTypes'
import * as sectionNames from '../../constants/sectionNames'

const mapStateToProps = (state) => {
  const activeItemType = state.getIn(['uiState', 'activeItem', 'type'])
  const activeItemID = state.getIn(['uiState', 'activeItem', 'id'], -1)
  const props = [
    {
      type: BASIC,
      items: [
        {
          type: sectionTypes.INBOX,
          title: sectionNames.INBOX,
          active: activeItemType === sectionTypes.INBOX ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && !task.get('project') && !task.get('contexts')).size
        },
        {
          type: sectionTypes.TODAY,
          title: sectionNames.TODAY,
          active: activeItemType === sectionTypes.TODAY ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && task.get('today')).size
        },
        {
          type: sectionTypes.NEXT,
          title: sectionNames.NEXT,
          active: activeItemType === sectionTypes.TODAY ? true : false
        }
      ]
    },
    {
      type: CONTEXTS,
      title: sectionNames.CONTEXTS,
      items: state.get('context').map(item => {
        const id = item.get('id')
        return {
          id: id,
          type: sectionTypes.CONTEXT,
          title: item.get('title'),
          active: activeItemType === sectionTypes.CONTEXT && activeItemID === id ? true : false,
          count: state.get('task').filter(task => !task.get('completed') && task.get('contexts').has(id)).size
        }
      })
    },
    {
      type: PROJECTS,
      title: sectionNames.PROJECTS,
      items: state.get('project').map(item => {
        const id = item.get('id')
        return {
          id: id,
          type: sectionTypes.PROJECT,
          title: item.get('title'),
          active: activeItemType === sectionTypes.PROJECT && activeItemID === id ? true : false
        }
      })
    }
  ]
  return fromJS({groups: props})
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (id, type) => {
      dispatch(setActiveItem({type: type, id: id}))
    }
  }
}

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default Sidebar
