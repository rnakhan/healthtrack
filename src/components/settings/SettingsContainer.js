import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import BackButtonAppBar from '../common/BackButtonAppBar';
import SettingsPanel from './SettingsPanel';
import Swipeable from 'react-swipeable';

export default class SettingsContainer extends Component {

  render() {
    return (
      <Swipeable
        onSwipedRight={() => this.props.swipeHandler("SettingsContainer", "right", this.props.history)}
      >
      <div>
        <BackButtonAppBar title="Settings" {...this.props}/>
        <div>
          <SettingsPanel {...this.props}/>
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
      </Swipeable>
    );
  }
}