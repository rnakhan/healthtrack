import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const FastingHistoryList = (props) => {
    return (
      <List style={{ overflowY: "scroll" }}>
        <ListSubheader>Recent meals</ListSubheader>
        {props.fastingHistoryList}
      </List>
    );
}
export default FastingHistoryList;