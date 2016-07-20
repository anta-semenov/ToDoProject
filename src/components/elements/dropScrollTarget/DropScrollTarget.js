import React from 'react'
import { DropTarget } from 'react-dnd'
import { TASK, SECTION } from '../../../constants/dndTypes'

const scrollTarget = {
  canDrop: () => false
}

const collect = (connect, monitor) => ({
  connectTarget: connect.dropTarget(),
  isHovering: monitor.isOver()
})

class DropScrollTarget extends React.Component {
  componentDidUpdate() {
    if (this.props.isHovering) {
      this._intervalID = setInterval(this.props.scrollCallback, 50)
    } else if (!this.props.isHovering && this._intervalID) {
      clearInterval(this._intervalID)
      this._intervalID = undefined
    }
  }

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
