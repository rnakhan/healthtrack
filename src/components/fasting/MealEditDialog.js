import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DateAndTimePickers from '../common/DateAndTimePickers';

class MealEditDialog extends Component {

  renderDialogActions = () => {
    let dialogActions = []; // jsx concat needs an array because jsx are objects
    if (!this.props.isNew) {
      dialogActions.push(
        <Button
              variant="text"
              color="secondary"
              onClick={this.props.onDelete}
            >
              Delete
            <DeleteIcon />
            </Button>
      );
    }
    dialogActions.push(
      <Button
        variant="text"
        color="primary"
        onClick={this.props.onSave}
      >
        Save
      </Button>
    );
    return dialogActions;
  }

  render() {
    const titleText = this.props.isNew ? "Add" : "Edit";
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          maxWidth='lg'
        >
          <DialogTitle id="form-dialog-title">{titleText} Meal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add the time of the meal here
          </DialogContentText>
            <DateAndTimePickers defaultValue={this.props.dateTime} onTimeChanged={this.props.onTimeChanged} />
          </DialogContent>
          <DialogActions>
            {this.renderDialogActions()}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(MealEditDialog);