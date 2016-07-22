import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

const StatefulComponent = (StatelessComponent) => {
  class NewComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState)
    }
    render() {
      return <StatelessComponent {...this.props} />
    }
  }
  return NewComponent
}

export default StatefulComponent
