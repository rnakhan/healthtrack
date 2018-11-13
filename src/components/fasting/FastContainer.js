import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import FastingControlPanel from './FastingControlPanel';

export default class FastContainer extends Component {
  constructor(props) {
    super(props);
    var tmp1 = new Date(2018, 10, 12, 8, 10, 10)
    this.state = {
      lastMeal: tmp1,
      fastingSince: (new Date()) - tmp1
    }
    this.refreshTimer();
  }

  refreshTimer = () => {
    this.setState({ fastingSince: (new Date()) - this.state.lastMeal });
    setTimeout(() => this.refreshTimer(), 1000);
  }
  render() {
    return (
      <div>
        <FastingControlPanel fastingSince={this.state.fastingSince}/>
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