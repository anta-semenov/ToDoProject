import React, { Component } from 'react'
import Navigation from '../navigation/Navigation'
import { connect } from 'react-redux'
import { setActiveItem } from '../../actions/uiStateAction'
import { BASIC, PROJECTS, CONTEXTS} from '../../constants/navGroupTypes'
import { Map } from 'immutable'
import * as sectionTypes from '../../constants/sectionTypes'
import * as sectionNames from '../../constants/sectionNames'


export default class ClassName extends Component {
  render() {
    return(
      <Navigation {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => {
  const props = [
    {
      type: BASIC,
      items: [
        {
          type: sectionTypes.INBOX,
          title: sectionNames.INBOX,
          active: state.getIn(['uiState', 'activeItem', 'type']) === sectionTypes.INBOX ? true : false,
          count: state.get('task').filter(item => !item.get('project') && !item.get('contexts')).size
        }
      ]
    }
  ]
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (id, type) => {
      dispatch(setActiveItem({type: type, id: id}))
    }
  }
}
