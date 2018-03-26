import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CarbContainer from './components/CarbContainer'
import FastContainer from './components/FastContainer';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class TopContainer extends Component {

  // Using the hoaky render because using component with Route doesn't allow amy props. So far Router is not great..
  render() {
    return (
      <div>
        <Switch>
          <Route 
            exact path="/" 
            render={props => <CarbContainer selected={0} {...props} />} />
          <Route exact path="/fasting" 
            render={props => <FastContainer selected={1} {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default TopContainer;