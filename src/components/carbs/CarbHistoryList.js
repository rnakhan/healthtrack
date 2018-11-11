import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CarbHistoryEditPopover from './CarbHistoryEditPopover';
import { firstCharOfDayWithColor } from '../common/Utils';

export default class CarbHistoryList extends Component {

  state = {
    open: false,
    editingListItem: { date: 0 } // we use date as key to differentiate dialog instances
  }

  render() {
    return (
      <List style={{ overflowY: "scroll" }}>
        <Subheader>Recent days</Subheader>
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
      <CarbHistoryEditPopover 
        open={this.state.open}
        handleClose={this.handlePopEditClose}
        updateHistoryList={this.updateHistoryList}
        listItem={this.state.editingListItem}
        key={this.state.editingListItem.date} // because of the key we generate a new Dialog - this is clean
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
    var fcod;
    return list.map(
      (entry) => {
        fcod = firstCharOfDayWithColor(entry.date);
        return (
          <ListItem
            key={entry.date}
            onClick={(e) => { this.onListItemClick(entry)} }
            primaryText={entry.totalCarbs}
            leftAvatar={
              <Avatar
                backgroundColor={fcod.color}
                size={30}
              >
                {fcod.day}
              </Avatar>}
            secondaryText={(new Date(entry.date)).toDateString()}
          />
        );
      }
    );
  }
}