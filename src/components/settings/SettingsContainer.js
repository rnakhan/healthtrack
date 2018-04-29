import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import BackButtonAppBar from '../common/BackButtonAppBar';
import SettingsPanel from './SettingsPanel';

export default class SettingsContainer extends Component {

  render() {
    return (
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
    );
  }
}