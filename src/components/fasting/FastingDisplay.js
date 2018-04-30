import React from 'react';
import { Paper } from 'material-ui';

const FastingDisplay = (props) => {
  return (
    <div>
    <Paper style={style.displayContainer} zDepth={0}>
      <div style={style.textStyle}>
        11hr 15 min 23 sec 
      </div>
    </Paper>
    </div>
  );
}

const style = {
  displayContainer: {

  },
  textStyle: {

  }
}

export default FastingDisplay;