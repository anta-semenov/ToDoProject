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

  componentWillReceiveProps(nextProps) {
    if (shallowCompare({props: this.props, state: {}}, nextProps, {})) {
      this.setState({})
    }
  }

  changeItemOrder(firstIndex, secondIndex) {
    const items = this.state.items || this.props.items
    const item = items.get(firstIndex)

    this.setState({items: items.splice(firstIndex,1).splice(secondIndex,0,item)})
  }

  endDrag(index) {
    const items = this.state.items || this.props.items
    const item = items.get(index)
    const nextId = items.getIn([index+1,'id'])
    this.props.changePosition(item.get('type'), item.get('id'), nextId)
  }

  render() {
    const { title, type, addNew, onItemClick, onStopEditing} = this.props
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
              onItemClick={onItemClick}
              onStopEditing={onStopEditing}
              endDrag={(index) => this.endDrag(index)}
              changeOrder={(firstIndex, secondIndex) => this.changeItemOrder(firstIndex, secondIndex)}/>
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
      editing: React.PropTypes.bool
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
