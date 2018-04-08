import React, { Component } from 'react';
import CarbControlPanel from './CarbControlPanel';
import { getWholeDate } from './common/Utils';
import CarbHistoryList from './CarbHistoryList';
import { updateCarbs } from './common/CommonCarbCalc';
import BottomNav from './BottomNav';


export default class CarbContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      today: this._getDefaultTodayState(),
      past: []
    };
  }

  _getDefaultTodayState = () => {
    return {
      date: getWholeDate(),
      totalCarbs: 0,
      breakfastCarbs: '',
      lunchCarbs: '',
      dinnerCarbs: '',
      otherCarbs: ''
    };
  }

  _getNewStateFromTemplate = (oldState) => {
    let newState = {};
    newState.today = { ...oldState.today };
    newState.today.date = getWholeDate();
    // TODO when there is a limit of records, you may drop old data here
    newState.past = oldState.past.slice();
    return newState;
  }

  componentDidMount = () => {
    const oldState = JSON.parse(localStorage.getItem('state'));
    if (oldState) {
      const newState = this._getNewStateFromTemplate(oldState);
      this._checkAndSetState(newState, oldState);
    }
  }

  _checkAndSetState = (newState, oldState) => {
    if (newState.today.date > oldState.today.date) {
      newState.past.unshift(oldState.today);
      newState.today = this._getDefaultTodayState();
    }
    this._setAndSaveState(newState);
  }

  _setAndSaveState = (state) => {
    this.setState(state);
    localStorage.setItem('state', JSON.stringify(state));
  }

  updateTodaysCarbValue = (e, type) => {
    const newState = this._getNewStateFromTemplate(this.state);
    newState.today = updateCarbs(e, type, newState.today);
    this._checkAndSetState(newState, this.state);
  }

  updateHistoricalEntry = (listItem) => {
    let newPastList = this.state.past.map(
      (entry) => {
        if (entry.date === listItem.date) return listItem;
        else return entry; 
      }
    );
    const newState = this._getNewStateFromTemplate(this.state);
    newState.past = newPastList;
    this._setAndSaveState(newState);
  }

  render() {
    const { totalCarbs, breakfastCarbs, lunchCarbs, dinnerCarbs, otherCarbs } = this.state.today;
    return (
      <div id="carbcontainer">
          <CarbControlPanel
            totalCarbs={totalCarbs}
            breakfastCarbs={breakfastCarbs}
            lunchCarbs={lunchCarbs}
            dinnerCarbs={dinnerCarbs}
            otherCarbs={otherCarbs}
            updateCarbValue={this.updateTodaysCarbValue}
            dateString='today'
          />
          <div style={{ marginBottom: 56}} >
            <CarbHistoryList
              historyList={this.state.past}
              updateHistoryList={this.updateHistoricalEntry}
            />
          </div>
          <div style={{
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
            }}>
            <BottomNav { ...this.props} />
          </div>
      </div>
    );
  }
}
