import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DateAndTimePickers from '../common/DateAndTimePickers';

const MealEditDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        maxWidth='lg'
      >
        <DialogTitle id="form-dialog-title">Add Meal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the time of the meal here
          </DialogContentText>
          <DateAndTimePickers defaultValue={props.dateTime} onTimeChanged={props.onTimeChanged}/>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary" 
            onClick={props.onSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withMobileDialog()(MealEditDialog);