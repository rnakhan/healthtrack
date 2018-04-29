import React from 'react';
import { Paper } from 'material-ui';
import { hoursToGoString } from '../common/Utils';

const colorChooser = (number, maxCarbs) => {
  if (number >= maxCarbs) {
    return 'red';
  }
  return 'green';
}

const displaySubtext = (dateString) => {
  if (dateString === 'today') {
    return hoursToGoString();
  }
  else {
    return dateString;
  }
}

// formats to 3 fixed spaces
const formatText = (text) => {
  return ("000" + text).slice(-3);
}

const CarbDisplay = (props) => (
  <div>
    <Paper style={style.displayPanel} zDepth={0}>
      <div style={{ ...style.mainTextStyle, color: colorChooser(props.value, props.maxCarbs) }} >
        {formatText(props.value)}
      </div>
      <div style={style.subTextStyle} >
        {displaySubtext(props.dateString)}
      </div>
    </Paper>
  </div>
);

const style = {
  displayPanel: {
    height: '260px',
    margin: '10px',
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'center'

  },
  mainTextStyle: {
    fontSize: '70px',
    alignSelf: 'center'
  },
  subTextStyle: {
    fontSize: '16px',
    alignSelf: 'center',
    color: '#aaa',
    fontStyle: 'italic'
  }
};

export default CarbDisplay;