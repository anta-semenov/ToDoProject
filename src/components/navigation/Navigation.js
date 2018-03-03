import React, { PureComponent } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './Navigation.less'
import NavigationGroup from '../navigationGroup/NavigationGroup'
import DropScrollTarget from '../elements/dropScrollTarget/DropScrollTarget'
import { AUTH_SUCESS, AUTH_IN_PROGRESS, AUTH_ERROR, AUTH_NONE } from '../../constants/authStatus'
import { DATA_NONE, DATA_ERROR, DATA_REQUESTED, DATA_RECIEVED } from '../../constants/dataStatuses'

class Navigation extends PureComponent {

  render() {
    const {groups, dataStatus, authStatus, ...rest} = this.props

    if (dataStatus === DATA_RECIEVED || (authStatus === AUTH_NONE && dataStatus === DATA_NONE)) {
      return (
        <div className='navigation'>
          <DropScrollTarget className='nav-scroll nav-scroll--up' scrollCallback = {() => {
            if (this._navScrollView.scrollTop > 0) {
              this._navScrollView.scrollTop -=10
            }
          }} />
          <ul className='nav' ref={(ref) => this._navScrollView = ref} >
            {groups.toArray().map((group, index) =>
              <NavigationGroup
                key={index}
                items={group.get('items')}
                title={group.get('title')}
                type={group.get('type')}
                addNewTitle={group.get('addNewTitle')}
                {...rest}
              />
            )}
          </ul>
          <DropScrollTarget className='nav-scroll nav-scroll--down' scrollCallback = {() => {
            if (this._navScrollView.scrollTop < this._navScrollView.scrollHeight - this._navScrollView.clientHeight) {
              this._navScrollView.scrollTop +=10
            }
          }} />
        </div>
      )
    }

    return null
  }
}

Navigation.propTypes = {
  dataStatus: React.PropTypes.oneOf([DATA_NONE, DATA_ERROR, DATA_REQUESTED, DATA_RECIEVED]).isRequired,
  authStatus: React.PropTypes.oneOf([AUTH_SUCESS, AUTH_IN_PROGRESS, AUTH_ERROR, AUTH_NONE]).isRequired,
  groups: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      type: React.PropTypes.string.isRequired,
      items: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          type: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          active: React.PropTypes.bool.isRequired,
          id: React.PropTypes.string,
          count: React.PropTypes.number,
          editing: React.PropTypes.bool
        })
      ).isRequired,
      title: React.PropTypes.string,
      addNewTitle: React.PropTypes.string
    })
  ).isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  addNew: React.PropTypes.func,
  onStopEditing: React.PropTypes.func,
  changePosition: React.PropTypes.func
}

export default Navigation
