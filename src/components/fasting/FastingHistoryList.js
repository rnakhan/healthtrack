import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import { formatMealtime, msToTime } from '../common/Utils';

export default class FastingHistoryList extends Component {
  
  render() {
    return (
      <List style={{ overflowY: "scroll" }}>
        <ListSubheader>Recent meals</ListSubheader>
        {this.formatListItems(this.props.fastingHistoryList)}
      </List>
    );
  }

  onListItemClick = (entry) => {
    this.props.handleDialogOpen(entry);
  }

  formatListItems = (list) => {
    if (!list || list.length == 0) {
      return (<div></div>);
    }
    list.sort( (a, b) => { return (a.date - b.date) }); // ascending
    let newList = [];
    let lastDate = null;
    let fastedDuration = null;
    let fastedDurationText = '';
    for (let i = 0; i < list.length; i++) {
      if (lastDate) {
        fastedDuration = msToTime(list[i].date - lastDate);
        fastedDurationText = 'Fasted ' + fastedDuration.hours + ':' + fastedDuration.minutes;
      }
      newList.push((
        <ListItem key={list[i].date} onClick={(e) => { this.onListItemClick(list[i]) }}> 
          <ListItemText primary={formatMealtime(list[i].date)} secondary={fastedDurationText}/>
        </ListItem>
      ))
      lastDate = list[i].date;
    }
    return newList.reverse();  // descending
  }
}