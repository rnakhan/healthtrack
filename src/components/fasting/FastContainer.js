import React, { Component } from 'react';
import BottomNav from '../BottomNav';
import FastingControlPanel from './FastingControlPanel';
import FastingHistoryList from './FastingHistoryList';
import MealEditDialog from './MealEditDialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Swipeable from 'react-swipeable';
import { formatPickerTime, formatMealtime, msToTime } from './../common/Utils';

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

  formatListItems = (list) => {
    let totalFastedDuration = this.state.fastingSince;
    this.mealsInLast24Hrs = 0;
    if (!list || list.length === 0) {
      this.averageFastDuration = totalFastedDuration;
      return (<div></div>);
    }
    list.sort((a, b) => { return (a.date - b.date) }); // ascending
    let newList = [];
    let lastDate = null;
    let fastedDuration = null;
    let fastedDurationText = '';
    for (let i = 0; i < list.length; i++) {
      if (lastDate) {
        fastedDuration = msToTime(list[i].date - lastDate);
        totalFastedDuration += (list[i].date - lastDate);
        fastedDurationText = 'Fasted ' + fastedDuration.hours + ':' + fastedDuration.minutes;
      }
      newList.push((
        <ListItem 
          key={list[i].date} 
        > 
        <ListItemText 
          primary={formatMealtime(list[i].date)} 
          secondary={fastedDurationText}
          onClick={(e) => {this.handleDialogOpen(list[i])}}
        />  
        </ListItem>
      ))
      lastDate = list[i].date;
      if ((new Date() - lastDate) < 24*60*60*1000) {
        this.mealsInLast24Hrs += 1;
      }
    }
    this.averageFastDuration = totalFastedDuration / (list.length);
    return newList.reverse();  // descending
  }

  saveLocalState = (historyArray) => {
    localStorage.setItem('fasting-state', JSON.stringify(historyArray));
  }

  // fasting state is an array of { date: dateObject }
  readStateFromStore = () => {
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
    if (entry === null) {
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
    if (this.state.editingEntry === "NEW") {
      newHistoryArray = this.state.savedFastingHistory.concat({ date: new Date(this.state.editingDateTime) });
    } else {
      newHistoryArray = this.state.savedFastingHistory.map(entry => {
        if (this.state.editingEntry.date === entry.date) return ({ date: new Date(this.state.editingDateTime) });
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
    this.saveLocalState(newHistoryArray);
    this.handleDialogClose();
  }

  deleteEntry = () => {
    let newHistoryArray = this.state.savedFastingHistory.filter((t) => t.date !== this.state.editingEntry.date);
    this.setState({ savedFastingHistory: newHistoryArray });
    this.saveLocalState(newHistoryArray);
    this.handleDialogClose();
  }

  onTimeChanged = (e) => {
    this.setState({ editingDateTime: e.target.value });
  }

  renderDialog = () => {
    const isNew = this.state.editingEntry === "NEW" ? true : false;
    return(
      <MealEditDialog 
        open={this.state.dialogOpen} 
        handleClose={this.handleDialogClose}
        onSave={this.saveNewTime}
        onDelete={this.deleteEntry}
        dateTime={this.state.editingDateTime}
        onTimeChanged={this.onTimeChanged}
        isNew={isNew}
      />
    ); 
  }

  render() {
    this.formattedList = this.formatListItems(this.state.savedFastingHistory);
    return (
      <div>
        <Swipeable
          onSwipedLeft={() => this.props.swipeHandler("FastContainer", "left", this.props.history)}
          onSwipedRight={() => this.props.swipeHandler("FastContainer","right", this.props.history)}
        >
        {this.renderDialog()}
        <FastingControlPanel 
          fastingSince={this.state.fastingSince}
          fastDurationHrs={this.props.fastDurationHrs}
          averageFastDuration={this.averageFastDuration}
          mealsInLast24Hrs={this.mealsInLast24Hrs}
          handleDialogOpen={this.handleDialogOpen}
        />
        <div style={{ marginBottom: 56 }} >
          <FastingHistoryList
            fastingHistoryList={this.formattedList}
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
        </Swipeable>
      </div>
    );
  }
}