import React, { Component } from 'react';
import { FormControl, FormLabel } from 'material-ui-next';
import NumberInput from './common/NumberInput';
import GeneralContainer from './common/GeneralContainer';
import { CONFIG_MAX_CARBS, CONFIG_MAX_CARBS_HISTORY } from './common/Constants';

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
            updateFunction={(e) => this.props.updateCarbConfig(e, CONFIG_MAX_CARBS)}
            label='Max carbs'
          />
          <NumberInput
            style={{ width: '60%' }}
            value={settings.carbConfig.maxHistoryList}
            updateFunction={(e) => this.props.updateCarbConfig(e, CONFIG_MAX_CARBS_HISTORY)}
            label='Number of entries'
          />
        </FormControl>

        <FormControl style={{ marginLeft: '20px', marginTop: '20px' }}>
          <FormLabel> Fasting Settings </FormLabel>
          <NumberInput
            style={{ width: '60%' }}
            value={10}
            updateFunction={() => console.log('update called')}
            label='Minimum Meal duration'
          />
          <NumberInput
            style={{ width: '60%' }}
            value={20}
            updateFunction={() => console.log('update called')}
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