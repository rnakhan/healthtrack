import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconCarb from 'material-ui/svg-icons/av/closed-caption';
import IconFasting from 'material-ui/svg-icons/device/access-time';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const settingsIcon = <IconSettings />;
const carbIcon = <IconCarb />;
const fastingIcon = <IconFasting />;

class BottomNav extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Carbs"
            icon={carbIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Fasting"
            icon={fastingIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Settings"
            icon={settingsIcon}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;