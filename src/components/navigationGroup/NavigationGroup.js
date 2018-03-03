import PropTypes from 'prop-types';
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
      this.setState({items: undefined})
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
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      id: PropTypes.string,
      count: PropTypes.number,
      editing: PropTypes.bool
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onStopEditing: PropTypes.func,
  changePosition: PropTypes.func,

  title: PropTypes.string,

  type: PropTypes.string,
  addNewTitle : PropTypes.string,
  addNew: PropTypes.func
}

export default NavigationGroup
