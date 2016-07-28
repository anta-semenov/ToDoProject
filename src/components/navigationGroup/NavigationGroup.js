import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import shallowCompare from 'react-addons-shallow-compare'
import './NavigationGroup.less'

import NavigationItem from '../navigationItem/NavigationItem'

class NavigationGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  changeItemOrder(firstIndex, secondIndex) {
    const items = this.state.items || this.props.items
    const item = items.get(firstIndex)

    this.setState({items: items.splice(firstIndex,1).splice(secondIndex,0,item)})
  }

  dropEnd() {
    this.setState({})
  }

  render() {
    const { title, type, addNew, onItemClick, onStopEditing, changePosition} = this.props
    const items = this.state.items || this.props.items

    return(
      <li className='nav-group'>
        {title ?
          <div className='nav-group__title'>
            <div className='nav-group__title-text' >{title}</div>
            {addNew ? <div className='nav-group__add-button' onClick={() => addNew(type)} /> : null}
          </div>
          : null}
        <ul className='nav-group__list'>
          {items.map((item, index) =>
            <NavigationItem
              key={`${item.get('type')}-${item.get('id')}`}
              id={item.get('id')}
              index = {index}
              type={item.get('type')}
              title={item.get('title')}
              active={item.get('active')}
              editing={item.get('editing')}
              count={item.get('count')}
              nextId={item.get('nextId')}
              onItemClick={onItemClick}
              onStopEditing={onStopEditing}
              changePosition={changePosition}
              changeOrder={(firstIndex, secondIndex) => this.changeItemOrder(firstIndex, secondIndex)}
              dropEnd={() => this.dropEnd()}/>
          )}
        </ul>
      </li>
    )
  }
}

NavigationGroup.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      type: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      active: React.PropTypes.bool.isRequired,
      id: React.PropTypes.string,
      count: React.PropTypes.number,
      editing: React.PropTypes.bool,
      nextId: React.PropTypes.string
    })
  ).isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func,
  changePosition: React.PropTypes.func,

  title: React.PropTypes.string,

  type: React.PropTypes.string,
  addNewTitle : React.PropTypes.string,
  addNew: React.PropTypes.func
}

export default NavigationGroup
