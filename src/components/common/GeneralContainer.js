import React from 'react';
import Paper from 'material-ui/Paper';

const GeneralContainer = (props) => {
  const combinedStyle = { ...style.containerStyle, ...props.style }
  return (
    <Paper style={combinedStyle} zDepth={1} >
      {props.children}
    </Paper>
  );
};

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

export default GeneralContainer;