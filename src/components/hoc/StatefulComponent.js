import React, { PureComponent } from 'react'

const StatefulComponent = (StatelessComponent) => {
  class StatefulComponent extends PureComponent {
    render() {
      return <StatelessComponent {...this.props} />
    }
  }
  return StatefulComponent
}

export default StatefulComponent
