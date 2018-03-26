import React, { Component } from 'react';
import BottomNav from './BottomNav';

export default class FastContainer extends Component {

  render() {
    return (
      <div>
        <div>
          Coming Soon
        </div>
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