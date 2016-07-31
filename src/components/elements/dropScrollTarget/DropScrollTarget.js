import React from 'react'
import { DropTarget } from 'react-dnd'
import { TASK, SECTION } from '../../../constants/dndTypes'

const scrollTarget = {
  canDrop: () => false,
  hover: (props) => {
    props.scrollCallback()
  }
}

const collect = (connect) => ({
  connectTarget: connect.dropTarget()
})

class DropScrollTarget extends React.Component {
  render() {
    return(
      this.props.connectTarget(<div className={this.props.className}/>)
    )
  }
}

DropScrollTarget.propTypes = {
  scrollCallback: React.PropTypes.func.isRequired,
  className: React.PropTypes.string
}

export default DropTarget([TASK, SECTION], scrollTarget, collect)(DropScrollTarget)
