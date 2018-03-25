import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import CarbControlPanel from './CarbControlPanel';
import { formatDate, getWholeDate, parseState } from './common/Utils';
import CarbHistoryList from './CarbHistoryList';
import { BREAKFAST, LUNCH, DINNER, OTHER } from './common/Constants';
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

  _numerify = (value) => {
    if (value === '') return 0;
    else return value;
  }

  componentDidMount = () => {
    const oldState = JSON.parse(localStorage.getItem('state'));
    if (oldState) {
      const newState = this._getNewStateFromTemplate(oldState);
      this._checkAndSetState(newState, oldState);
    }
  }

  updateTotalCarbsState(newState, oldState) {
    newState.today.totalCarbs =
      this._numerify(newState.today.breakfastCarbs) +
      this._numerify(newState.today.lunchCarbs) +
      this._numerify(newState.today.dinnerCarbs) +
      this._numerify(newState.today.otherCarbs);
    this._checkAndSetState(newState, oldState);
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

  updateCarbValue = (e, type) => {
    let val = '';
    if (e.target.value) {
      val = parseInt(e.target.value);
    }
    const newState = this._getNewStateFromTemplate(this.state);
    switch (type) {
      case BREAKFAST:
        newState.today = { ...this.state.today, breakfastCarbs: val, date: getWholeDate() };
        break;
      case LUNCH:
        newState.today = { ...this.state.today, lunchCarbs: val, date: getWholeDate() };
        break;
      case DINNER:
        newState.today = { ...this.state.today, dinnerCarbs: val, date: getWholeDate() };
        break;
      case OTHER:
        newState.today = { ...this.state.today, otherCarbs: val, date: getWholeDate() };
        break;
    }
    this.updateTotalCarbsState(newState, this.state);
  }

  render() {
    const { totalCarbs, breakfastCarbs, lunchCarbs, dinnerCarbs, otherCarbs } = this.state.today;
    return (
      <div>
          <CarbControlPanel
            totalCarbs={totalCarbs}
            breakfastCarbs={breakfastCarbs}
            lunchCarbs={lunchCarbs}
            dinnerCarbs={dinnerCarbs}
            otherCarbs={otherCarbs}
            updateCarbValue={this.updateCarbValue}
          />
          <div style={{ marginBottom: 56}} >
            <CarbHistoryList
              historyList={this.state.past}
            />
          </div>
          <div style={{
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
            }}>
            <BottomNav />
          </div>
      </div>
    );
  }
}
