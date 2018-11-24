import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import FastingControlPanel from './FastingControlPanel';
import FastingHistoryList from './FastingHistoryList';
import MealEditDialog from './MealEditDialog';
import { formatPickerTime } from './../common/Utils';

export default class FastContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      dialogOpen: false,
      savedFastingHistory: [],
      lastMeal: new Date(),
      fastingSince: 0,
      editingDateTime: new Date(),
      editingEntry: "NEW"
    };
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalHandle);
  }

  componentDidMount = () => {
    this.readStateFromStore();
    this.intervalHandle = setInterval(() => this.refreshTimer(), 1000);
  }

  // fasting state is an array of { date: dateObject }
  readStateFromStore() {
    const savedHistory = JSON.parse(localStorage.getItem('fasting-state'));
    let savedFastingHistory, lastMeal;
    if (savedHistory && savedHistory[savedHistory.length - 1]) {
      savedFastingHistory = (JSON.parse(localStorage.getItem('fasting-state'))).map(e => { return { date: new Date(e.date)}});
      lastMeal = (savedFastingHistory[savedFastingHistory.length - 1]).date; // last meal
    } else {
      lastMeal = new Date();
    }
    this.setState({ 
      lastMeal, 
      fastingSince: (new Date() - lastMeal),
      savedFastingHistory: savedFastingHistory || []
    });
  }

  refreshTimer = () => {
    this.setState({ fastingSince: (new Date()) - this.state.lastMeal });
  }

  handleDialogOpen = (entry) => {
    let editingEntry, editingDate;
    if (entry == null) {
      editingDate = new Date();
      editingEntry = "NEW";
    } else {
      editingDate = entry.date;
      editingEntry = entry;
    }
    this.setState({ editingEntry, editingDateTime: formatPickerTime(editingDate),  dialogOpen: true });
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  }

  saveNewTime = () => {
    let newHistoryArray;
    if (this.state.editingEntry == "NEW") {
      newHistoryArray = this.state.savedFastingHistory.concat({ date: new Date(this.state.editingDateTime) });
    } else {
      newHistoryArray = this.state.savedFastingHistory.map(entry => {
        if (this.state.editingEntry.date == entry.date) return ({ date: new Date(this.state.editingDateTime) });
        else return entry;
      });
    }
    newHistoryArray.sort( (a, b) => { return (a.date - b.date) }); // descending
    let lastMeal = (newHistoryArray[newHistoryArray.length - 1]).date; // last meal
    this.setState({ 
      lastMeal, 
      fastingSince: (new Date() - lastMeal),
      savedFastingHistory: newHistoryArray
    });
    localStorage.setItem('fasting-state', JSON.stringify(newHistoryArray));
    this.handleDialogClose();
  }

  onTimeChanged = (e) => {
    this.setState({ editingDateTime: e.target.value });
  }

  renderDialog = () => {
    return(
      <MealEditDialog 
        open={this.state.dialogOpen} 
        handleClose={this.handleDialogClose}
        onSave={this.saveNewTime}
        dateTime={this.state.editingDateTime}
        onTimeChanged={this.onTimeChanged}
      />
    ); 
  }

  render() {
    return (
      <div>
        {this.renderDialog()}
        <FastingControlPanel 
          fastingSince={this.state.fastingSince}
          fastDurationHrs={this.props.fastDurationHrs}
          handleDialogOpen={this.handleDialogOpen}
        />
        <div style={{ marginBottom: 56 }} >
          <FastingHistoryList
            fastingHistoryList={this.state.savedFastingHistory}
            handleDialogOpen={this.handleDialogOpen}
          />
        </div>
        <div style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
        }}>
          <BottomNav {...this.props} />
        </div>
      </div>
    );
  }
}