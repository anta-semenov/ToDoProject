import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './Navigation.less'
import NavigationGroup from '../navigationGroup/NavigationGroup'
import { DropTarget } from 'react-dnd'
import { TASK } from '../../constants/dndTypes'
import flow from 'lodash/flow'

const scrollTarget = {
  canDrop: () => true
}

const collectUpScroll = (connect, monitor) => ({
  connectUpScrollTarget: connect.dropTarget(),
  isHoveringUp: monitor.isOver()
})

const collectDownScroll = (connect, monitor) => ({
  connectDownScrollTarget: connect.dropTarget(),
  isHoveringDown: monitor.isOver()
})

class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.isHoveringUp && this._navScrollView.scrollTop > 0) {
      this._intervalID = setInterval(() => {
        if (this._navScrollView.scrollTop > 0) {
          this._navScrollView.scrollTop -=10
        }
      }, 60)
    } else if (!this.props.isHoveringUp && !this.props.isHoveringDown && this._intervalID) {
      clearInterval(this._intervalID)
      this._intervalID = undefined
    } else if (this.props.isHoveringDown && this._navScrollView.scrollTop < this._navScrollView.scrollHeight - this._navScrollView.clientHeight) {
      this._intervalID = setInterval(() => {
        if (this._navScrollView.scrollTop < this._navScrollView.scrollHeight - this._navScrollView.clientHeight) {
          this._navScrollView.scrollTop +=10
        }
      }, 60)
    }
  }

  render() {
    return (
      <div className='navigation'>
        {this.props.connectUpScrollTarget(<div className='nav-scroll' />)}
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
            />
          )}
        </ul>
        {this.props.connectDownScrollTarget(<div className='nav-scroll'/>)}
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
  onStopEditing: React.PropTypes.func
}

export default flow(
  DropTarget(TASK, scrollTarget, collectUpScroll),
  DropTarget(TASK, scrollTarget, collectDownScroll)
)(Navigation)
