import React from 'react';
import NumberInput from '../common/NumberInput';
import { BREAKFAST, LUNCH, DINNER, OTHER } from '../common/Constants';

const CarbEntryForm = (props) => {
    return (
        <div style={style.containerStyle}>
            <NumberInput
                style={{width: '60%'}}
                value={props.breakfastValue}
                updateFunction={props.updateBreakfastValue}
                label={BREAKFAST}
            />
            <NumberInput
                style={{width: '60%'}}
                value={props.lunchValue}
                updateFunction={props.updateLunchValue}
                label={LUNCH}
            />
            <NumberInput
                style={{width: '60%'}}
                value={props.dinnerValue}
                updateFunction={props.updateDinnerValue}
                label={DINNER}
            />
            <NumberInput
                style={{width: '60%'}}
                value={props.otherValue}
                updateFunction={props.updateOtherValue}
                label={OTHER}
            />
        </div>
    );
};

const style = {
    containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      marginRight: '3px',
      marginLeft: '3px',
      flex: 1
    },
};

export default CarbEntryForm;