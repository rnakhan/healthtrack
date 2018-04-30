import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import FastingControlPanel from './FastingControlPanel';

export default class FastContainer extends Component {

  render() {
    return (
      <div>
        <FastingControlPanel />
        <div style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
        }}>
          <BottomNav {...this.props} />
        </div>
      </div>
    );
  }
}