import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { colorChooser, msToTime } from '../common/Utils';

const FastingDisplay = (props) => {
  const { hours, minutes, seconds } = msToTime(props.fastingSince); 
  const avg = msToTime(props.averageFastDuration);
  return (
    <Paper style={style.displayPanel} elevation={0}>
      <Typography 
        style={{ ...style.bigTextStyle, 
                 color: colorChooser(props.fastDurationHrs * 60 * 60 * 1000, props.fastingSince) 
      }}>
        {hours}:{minutes}:{seconds}
      </Typography>
      <Typography component="p" style={style.subTextStyle}>
        Avg Fast duration : {avg.hours}:{avg.minutes}:{avg.seconds}
      </Typography>
      <Typography component="p" style={style.subTextStyle}>
        Meals in last 24 hr : {props.mealsInLast24Hrs}
      </Typography>
    </Paper>
  );
}

const style = {
  displayPanel: {
    height: '260px',
    margin: '10px',
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'center'

  },
  bigTextStyle: {
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

export default FastingDisplay;