import React, {Component} from 'react';
import {Provider} from 'react-redux';
import DevTool  from './DevTool';

export default class Root extends Component {
  render() {
    return(
      <Provider >
        <DevTool />
      </Provider>
    );
  }
}
