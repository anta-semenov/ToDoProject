import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './Navigation.less'
import NavigationGroup from '../navigationGroup/NavigationGroup'
import DropScrollTarget from '../elements/dropScrollTarget/DropScrollTarget'
import shallowCompare from 'react-addons-shallow-compare'

class Navigation extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const {groups, ...rest} = this.props
    return (
      <div className='navigation'>
        <DropScrollTarget className='nav-scroll nav-scroll--up' scrollCallback = {() => {
          if (this._navScrollView.scrollTop > 0) {
            this._navScrollView.scrollTop -=10
          }
        }} />
        <ul className='nav' ref={(ref) => this._navScrollView = ref} >
          {groups.map((group, index) =>
            <NavigationGroup
              key={index}
              items={group.items}
              title={group.title}
              type={group.type}
              addNewTitle={group.addNewTitle}
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
}

Navigation.propTypes = {
  groups: React.PropTypes.arrayOf(
    React.PropTypes.shape({
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
