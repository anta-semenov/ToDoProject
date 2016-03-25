import React from 'react'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = 'task'>
    
      </div>
    )
  }
}

Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  today: React.PropTypes.bool.isRequired,

  description: React.PropTypes.string,
  priority: React.PropTypes.string,
  date: React.PropTypes.object
}
