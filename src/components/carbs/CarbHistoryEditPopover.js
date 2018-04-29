import React, { Component } from 'react';
//import Dialog from 'material-ui/Dialog';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button'
import CarbControlPanel from './CarbControlPanel';
import { formatDate } from '../common/Utils';
import { updateCarbs } from '../common/CommonCarbCalc';

export default class CarbHistoryEditPopover extends Component {

  state = {
    localItem: { 
      breakfastCarbs: 0, 
      lunchCarbs: 0, 
      dinnerCarbs: 0, 
      otherCarbs: 0,
      date: '01/01/1970' 
    }
  }
  
  updateLocalItem = (e, type) => {
    let newItem = updateCarbs(e, type, this.state.localItem);
    this.setState({ localItem: newItem });  
  }

  // Note that we are using the props the "seed" the state as we do the total
  // calculation locally and update the higher level state only when the user
  // hits the save button.
  // https://medium.com/@justintulk/react-anti-patterns-props-in-initial-state-28687846cc2e 
  // This is not an anti pattern!
  //
  // This is a component lifecycle static method. 
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.listItem) {
      return { localItem: nextProps.listItem };
    } else {
      return null;
    }
  }

  render() {
    const { totalCarbs, 
      breakfastCarbs, 
      lunchCarbs,
      dinnerCarbs, 
      otherCarbs, 
      date } = this.state.localItem;
    return (
      <div>
        <Dialog
          fullScreen={false}
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <DialogTitle>{"Edit Past Day"}</DialogTitle>
          <DialogContent>
            <CarbControlPanel
              totalCarbs={totalCarbs}
              breakfastCarbs={breakfastCarbs}
              lunchCarbs={lunchCarbs}
              dinnerCarbs={dinnerCarbs}
              otherCarbs={otherCarbs}
              updateCarbValue={this.updateLocalItem}
              dateString={formatDate(new Date(date))}
            />
          </DialogContent>
          <DialogActions>
             <Button variant="raised"
               onClick={() => this.props.updateHistoryList(this.state.localItem)}
             >
               Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
