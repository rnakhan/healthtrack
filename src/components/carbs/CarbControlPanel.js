import React, { Component } from 'react';
import CarbDisplay from './CarbDisplay';
import CarbEntryForm from './CarbEntryForm';
import { BREAKFAST, LUNCH, DINNER, OTHER } from '../common/Constants';
import GeneralContainer from '../common/GeneralContainer';


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
        <GeneralContainer>
            <CarbDisplay 
              value={totalCarbs}
              dateString={dateString}
              maxCarbs={this.props.maxCarbs}
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
        </GeneralContainer>
      );
  }
}