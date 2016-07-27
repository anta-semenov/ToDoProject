import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './Navigation.less'
import NavigationGroup from '../navigationGroup/NavigationGroup'
import DropScrollTarget from '../elements/dropScrollTarget/DropScrollTarget'

const Navigation = ({ groups, ...rest }) => (
  <div className='navigation'>
    <DropScrollTarget className='nav-scroll' scrollCallback = {() => {
      if (this._navScrollView.scrollTop > 0) {
        this._navScrollView.scrollTop -=10
      }
    }} />
    <ul className='nav'>
      {groups.map((group, index) =>
        <NavigationGroup
          {...rest}
          key={index}
          items={group.items}
          title={group.title}
          type={group.type}
          addNewTitle={group.addNewTitle}
        />
      )}
    </ul>

<<<<<<< HEAD
  render() {
    return (
      <div className='navigation'>
        <DropScrollTarget className='nav-scroll' scrollCallback = {() => {
          if (this._navScrollView.scrollTop > 0) {
            this._navScrollView.scrollTop -=10
          }
        }} />
        <ul className='nav' ref={(ref) => this._navScrollView = ref} >
          {this.props.groups.map((group, index) =>
            <NavigationGroup
              key={index} //We should pass unique identificator for array items
              items={group.items}
              title={group.title}
              onItemClick={this.props.onItemClick}
              type={group.type}
              addNewTitle={group.addNewTitle}
              addNew={this.props.addNew}
              onStopEditing={this.props.onStopEditing}
              changePosition={this.props.changePosition}
            />
          )}
        </ul>
        <DropScrollTarget className='nav-scroll' scrollCallback = {() => {
          if (this._navScrollView.scrollTop < this._navScrollView.scrollHeight - this._navScrollView.clientHeight) {
            this._navScrollView.scrollTop +=10
          }
        }} />
      </div>
    )
  }
}
=======
    <DropScrollTarget className='nav-scroll' scrollCallback = {() => {
      if (this._navScrollView.scrollTop < this._navScrollView.scrollHeight - this._navScrollView.clientHeight) {
        this._navScrollView.scrollTop +=10
      }
    }} />
  </div>
)
>>>>>>> master

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
