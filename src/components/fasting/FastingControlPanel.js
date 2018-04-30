import React, { Component } from 'react';
import GeneralContainer from '../common/GeneralContainer';
import FastingDisplay from './FastingDisplay';
import Button from 'material-ui-next/Button';

export default class FastingControlPanel extends Component {

  render() {
    return (
      <GeneralContainer style={style.containerStyle}>
        <FastingDisplay />
        <Button color="primary">
          Add Meal
        </Button>
      </GeneralContainer>
    );
  }
}

const style = {
  containerStyle: {
    flexDirection: 'column',
  },
};