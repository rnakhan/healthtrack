import React, { Component } from 'react';
import { FormControl } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import NumberInput from '../common/NumberInput';
import GeneralContainer from '../common/GeneralContainer';
import { 
  CONFIG_MAX_CARBS, 
  CONFIG_MAX_CARBS_HISTORY,
  CONFIG_FAST_DURATION,
  CONFIG_MAX_FAST_HISTORY 
} from '../common/Constants';

export default class SettingsPanel extends Component {

  render() {
    const settings = this.props.currentSettings;
    return (
      <GeneralContainer style={style.containerStyle}>
        <FormControl style={{ marginLeft: '20px', marginTop: '20px' }}>
          <FormLabel> Carb Settings </FormLabel>
          <NumberInput
            style={{ width: '60%' }}
            value={settings.carbConfig.maxCarbs}
            updateFunction={(e) => this.props.updateConfig(e, CONFIG_MAX_CARBS)}
            label='Max carbs'
          />
          <NumberInput
            style={{ width: '60%' }}
            value={settings.carbConfig.maxHistoryList}
            updateFunction={(e) => this.props.updateConfig(e, CONFIG_MAX_CARBS_HISTORY)}
            label='Number of entries'
          />
        </FormControl>

        <FormControl style={{ marginLeft: '20px', marginTop: '20px' }}>
          <FormLabel> Fasting Settings </FormLabel>
          <NumberInput
            style={{ width: '60%' }}
            value={settings.fastConfig.fastDuration}
            updateFunction={(e) => this.props.updateConfig(e, CONFIG_FAST_DURATION)}
            label='Preferred Fasting duration (hrs)'
          />
          <NumberInput
            style={{ width: '60%' }}
            value={settings.fastConfig.maxHistoryList}
            updateFunction={(e) => this.props.updateConfig(e, CONFIG_MAX_FAST_HISTORY)}
            label='Number of entries'
          />
        </FormControl>
        </GeneralContainer>
    );
  }
}

const style = {
  containerStyle: {
    flexDirection: 'column',
    height: '500px',
  },
};