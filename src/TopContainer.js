import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CarbContainer from './components/CarbContainer'
import FastContainer from './components/FastContainer';
import SettingsContainer from './components/SettingsContainer';
import { CONFIG_MAX_CARBS, CONFIG_MAX_CARBS_HISTORY } from './components/common/Constants';


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
        minMealDuration: 8,
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
              {...props}
            />} />
          <Route exact path="/fasting"
            render={props => <FastContainer selected={1} {...props} />} />
          <Route exact path="/settings"
            render={props => <SettingsContainer 
              selected={2} 
              updateCarbConfig={this.updateCarbConfig}
              currentSettings={this.state}
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

  updateCarbConfig = (e, type) => {
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
      default:
    }
  }
}

export default TopContainer;