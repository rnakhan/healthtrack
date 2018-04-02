import React, { Component } from 'react';
//import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconCarb from 'material-ui/svg-icons/av/closed-caption';
import IconFasting from 'material-ui/svg-icons/device/access-time';

//const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const settingsIcon = <IconSettings />;
const carbIcon = <IconCarb />;
const fastingIcon = <IconFasting />;

class BottomNav extends Component {


  render() {
    return (
      <Paper zDepth={3}>
        <BottomNavigation selectedIndex={this.props.selected}>
          <BottomNavigationItem
            label="Carbs"
            icon={carbIcon}
            onClick={() => { 
              this.props.history.replace('/');
            }}
          />
          <BottomNavigationItem
            label="Fasting"
            icon={fastingIcon}
            onClick={() => { 
              // these are top level routes, so we use replace instead of push
              // this takes surprise out of Android basck button behavior
              this.props.history.replace('/fasting');
            }}
          />
          <BottomNavigationItem
            label="Settings"
            icon={settingsIcon}
            onClick={() => { 
              //this.props.history.push('/settings');
            }}
          />
        </BottomNavigation>
        <Divider />
      </Paper>
    );
  }
}

export default BottomNav;