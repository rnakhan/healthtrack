import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import FastingControlPanel from './FastingControlPanel';
import FastingHistoryList from './FastingHistoryList';

export default class FastContainer extends Component {

  constructor(props) {
    super(props);
    //const savedFastingState = JSON.parse(localStorage.getItem('fasting-state'));
    this.savedFastingHistory = [
      { date: new Date(2018, 10, 12, 8, 21)},
      { date: new Date(2018, 10, 13, 6, 10)},
      { date: new Date(2018, 10, 13, 15, 11)},
      { date: new Date(2018, 10, 13, 22, 21)},
      { date: new Date(2018, 10, 14, 3, 23)},
      { date: new Date(2018, 10, 15, 11, 12)},
      { date: new Date(2018, 10, 16, 10, 11)},
      { date: new Date(2018, 10, 17, 16, 10)}
    ];
    this.state = {};
    if (this.savedFastingHistory && this.savedFastingHistory[this.savedFastingHistory.length - 1]) {
      this.state.lastMeal = (this.savedFastingHistory[this.savedFastingHistory.length - 1]).date; // last meal
    } else {
      this.state.lastMeal = new Date();
    }
    this.state.fastingSince = new Date() - this.state.lastMeal;
  }


  componentWillUnmount = () => {
    this._shouldUpdateScreen = false;
  }

  componentDidMount = () => {
    this._shouldUpdateScreen = true;
    this.refreshTimer();
  }

  refreshTimer = () => {
    if (!this._shouldUpdateScreen)  return;
    this.setState({ fastingSince: (new Date()) - this.state.lastMeal });
    setTimeout(() => this.refreshTimer(), 1000);
  }

  handleDialogOpen = (entry) => {
    console.log('Dialog open called ' + (entry ? entry.date : ' with new'));
  }

  render() {
    return (
      <div>
        <FastingControlPanel 
          fastingSince={this.state.fastingSince}
          fastDurationHrs={this.props.fastDurationHrs}
          handleDialogOpen={this.handleDialogOpen}
        />
        <div style={{ marginBottom: 56 }} >
          <FastingHistoryList
            fastingHistoryList={this.savedFastingHistory}
            handleDialogOpen={this.handleDialogOpen}
          />
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