import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { firstCharOfDayWithColor } from './common/Utils';

const CarbHistoryList = (props) => {
  return (
    <List style={{ overflowY: "scroll" }}>
      <Subheader>Recent days</Subheader>
      {formatListItems(props.historyList, props.style)}  
      <ListItem
          primaryText='55'
          leftAvatar={
            <Avatar
              backgroundColor='red'
              size={30}
            >
              A
          </Avatar> }
          secondaryText={(new Date()).toDateString()}
        /> 
        <ListItem
          primaryText='55'
          leftAvatar={
            <Avatar
              backgroundColor='blue'
              size={30}
            >
              B
          </Avatar> }
          secondaryText={(new Date()).toDateString()}
        /> 
        <ListItem
          primaryText='55'
          leftAvatar={
            <Avatar
              backgroundColor='green'
              size={30}
            >
              C
          </Avatar> }
          secondaryText={(new Date()).toDateString()}
        /> 
    </List>
  );
}

const formatListItems = (list) => {
  var fcod;
  return list.map(
    (entry) => {
      fcod = firstCharOfDayWithColor(entry.date);
      return (
        <ListItem
          primaryText={entry.totalCarbs}
          leftAvatar={
            <Avatar
              backgroundColor={fcod.color}
              size={30}
            >
              {fcod.day}
          </Avatar> }
          secondaryText={(new Date(entry.date)).toDateString()}
        />
      );
    }
  );
}

export default CarbHistoryList;