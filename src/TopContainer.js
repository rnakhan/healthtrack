import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CarbContainer from './components/carbs/CarbContainer'
import FastContainer from './components/fasting/FastContainer';
import SettingsContainer from './components/settings/SettingsContainer';
import { 
  CONFIG_MAX_CARBS, 
  CONFIG_MAX_CARBS_HISTORY,
  CONFIG_FAST_DURATION,
  CONFIG_MAX_FAST_HISTORY
} from './components/common/Constants';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /fasting
// and /settings routes will match any pathname that starts
// with /fasting or /settings. The / route will only match
// when the pathname is exactly the string "/"
class TopContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carbConfig: {
        maxCarbs: 100,
        maxHistoryList: 100
      },
      fastConfig: {
        fastDuration: 8,
        maxHistoryList: 100
      },
    };
    const configState = JSON.parse(localStorage.getItem("config-state"));
    // initialize config state from local storage with sensible defaults
    if (configState) {
      this.state = {
        carbConfig: { ...this.state.carbConfig, ...configState.carbConfig },
        fastConfig: { ...this.state.fastConfig, ...configState.fastConfig }
      };
    }
  }

  swipeHandler = (source, dir, history) => {
    switch(source) {
      case 'CarbContainer':
        if (dir === "left") history.push('/fasting');
        break;
      case 'FastContainer':
        if (dir === "left") history.push('/settings');
        if (dir === "right") history.replace('/');
        break;
      case 'SettingsContainer':
        if (dir === "right") history.replace('/fasting');
        break;
      default:
        break;
    }
  }

  // Using the render because using component with Route doesn't allow any props.
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact path="/"
            render={props => <CarbContainer
              selected={0}
              maxCarbs={this.state.carbConfig.maxCarbs}
              maxHistoryList={this.state.carbConfig.maxHistoryList}
              swipeHandler={this.swipeHandler}
              {...props}
            />} />
          <Route exact path="/fasting"
            render={props => <FastContainer 
              selected={1} 
              fastDurationHrs={this.state.fastConfig.fastDuration}
              maxHistoryList={this.state.fastConfig.maxHistoryList}
              swipeHandler={this.swipeHandler}
              {...props} 
            />} />
          <Route exact path="/settings"
            render={props => <SettingsContainer 
              selected={2} 
              updateConfig={this.updateConfig}
              currentSettings={this.state}
              swipeHandler={this.swipeHandler}
              {...props}
             />} />
        </Switch>
      </div>
    );
  }

  _setAndSaveState = (configState) => {
    this.setState(configState);
    localStorage.setItem('config-state', JSON.stringify(configState));
  }

  updateConfig = (e, type) => {
    let val = 0;
    let newState;
    if (e.target.value) {
      val = parseInt(e.target.value, 10); // second arg is radix
    }
    switch(type) {
      case CONFIG_MAX_CARBS: 
        newState = { ...this.state };
        newState.carbConfig.maxCarbs = val;
        this._setAndSaveState(newState);
        break;
      case CONFIG_MAX_CARBS_HISTORY: 
        newState = { ...this.state };
        newState.carbConfig.maxHistoryList = val;
        this._setAndSaveState(newState);
        break;
      case CONFIG_FAST_DURATION: 
        newState = { ...this.state };
        newState.fastConfig.fastDuration = val;
        this._setAndSaveState(newState);
        break;
      case CONFIG_MAX_FAST_HISTORY: 
        newState = { ...this.state };
        newState.fastConfig.maxHistoryList = val;
        this._setAndSaveState(newState);
        break;
      default:
    }
  }
}

export default TopContainer;