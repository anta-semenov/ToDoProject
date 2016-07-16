import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './Navigation.less'
import NavigationGroup from '../navigationGroup/NavigationGroup'
import { DropTarget } from 'react-dnd'
import { TASK } from '../../constants/dndTypes'

const scrollTarget = {
  canDrop: () => true
}

const collectUpScroll = (connect, monitor) => ({
  connectUpScrollTarget: connect.dropTarget(),
  isHoveringUp: monitor.isOver()
})

class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.isHoveringUp && this._navScrollView.scrollTop > 0) {
      this._navScrollView.scrollTop -= this.state.scrollDiff !== 0 ? this.state.scrollDiff : 10
      this.setState({scrollDiff: (this.state.scrollDiff !== 0 ? this.state.scrollDiff : 10)*1.1})
    }
  }

  render() {
    return (
      <div className='navigation'>
        {this.props.connectUpScrollTarget(<div className='nav-scroll' />)}
        <ul className='nav' ref={(ref) => this._navScrollView = ref}>
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
        <div className='nav-scroll'/>
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

export default DropTarget(TASK, scrollTarget, collectUpScroll)(Navigation)
