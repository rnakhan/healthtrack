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
          averageFastDuration={this.props.averageFastDuration}
          mealsInLast24Hrs={this.props.mealsInLast24Hrs}
        />
        <Button color="primary" variant="text" onClick={() => this.props.handleDialogOpen(null)}>
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