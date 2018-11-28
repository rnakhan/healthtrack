import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CarbHistoryEditPopover from './CarbHistoryEditPopover';
import { firstCharOfDayWithColor } from '../common/Utils';

export default class CarbHistoryList extends Component {

  // We use date as key to differentiate dialog instances
  state = {
    open: false,
    editingListItem: { date: 0 } 
  }

  render() {
    return (
      <List style={{ overflowY: "scroll" }}>
        <ListSubheader>Recent days</ListSubheader>
        {this.formatListItems(this.props.historyList, this.props.style)}
        {this.renderPopover()}
      </List>
    );
  }

  updateHistoryList = (element) => {
    this.handlePopEditClose();  
    this.props.updateHistoryList(element);
  }

  renderPopover = () => {
    return (
      // Because of the key we generate a new Dialog - this is clean
      <CarbHistoryEditPopover 
        open={this.state.open}
        handleClose={this.handlePopEditClose}
        updateHistoryList={this.updateHistoryList}
        listItem={this.state.editingListItem}
        key={this.state.editingListItem.date}
        maxCarbs={this.props.maxCarbs}
      />
    )
  }

  handlePopEditClose = () => {
    this.setState({ open: false });
  }

  onListItemClick = (entry) => {
    this.setState ({ open: true, editingListItem: entry });
  }

  formatListItems = (list) => {
    let fcod;
    return list.map(
      (entry) => {
        fcod = firstCharOfDayWithColor(entry.date);
        let avStyle = { backgroundColor: fcod.color };
        return (
          <ListItem
            key={entry.date}
            onClick={(e) => { this.onListItemClick(entry)} }
          >
            <Avatar
                style={avStyle}
                size={30}
            >
                {fcod.day}
            </Avatar>
            <ListItemText 
              primary={entry.totalCarbs}  
              secondary={(new Date(entry.date)).toDateString()}
            />
          </ListItem>  
        );
      }
    );
  }
}