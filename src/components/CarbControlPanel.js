import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CarbDisplay from './CarbDisplay';
import CarbEntryForm from './CarbEntryForm';
import { BREAKFAST, LUNCH, DINNER, OTHER } from './common/Constants';


export default class CarbControlPanel extends Component {

  render() {
    const { 
      totalCarbs, 
      breakfastCarbs, 
      lunchCarbs,
      dinnerCarbs,
      otherCarbs,
      updateCarbValue,
      dateString
    } = this.props;

      return (
        <Paper style={style.containerStyle} zDepth={1} >
            <CarbDisplay 
              value={totalCarbs}
              dateString={dateString}
            />
            <CarbEntryForm 
              breakfastValue={breakfastCarbs}
              updateBreakfastValue={ (e) => { updateCarbValue(e, BREAKFAST) }}

              lunchValue={lunchCarbs}
              updateLunchValue={ (e) => { updateCarbValue(e, LUNCH) }}

              dinnerValue={dinnerCarbs}
              updateDinnerValue={ (e) => { updateCarbValue(e, DINNER) }}

              otherValue={otherCarbs}
              updateOtherValue={ (e) => { updateCarbValue(e, OTHER) }}
            />
        </Paper>
      );
  }
}

const style = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '5px',
    height: '320px',
    padding: '5px'
  },
};