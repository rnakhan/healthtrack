import React, { Component } from 'react';
import GeneralContainer from '../common/GeneralContainer';
import FastingDisplay from './FastingDisplay';
import Button from '@material-ui/core/Button';

export default class FastingControlPanel extends Component {

  render() {
    return (
      <GeneralContainer style={style.containerStyle}>
        <FastingDisplay 
          fastingSince={this.props.fastingSince}
          fastDurationHrs={this.props.fastDurationHrs}
        />
        <Button color="primary" variant="text" onClick={this.props.handleDialogOpen}>
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