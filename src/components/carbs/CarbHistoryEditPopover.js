import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CarbControlPanel from "./CarbControlPanel";
import { formatDate } from "../common/Utils";
import { updateCarbs } from "../common/CommonCarbCalc";

export default class CarbHistoryEditPopover extends Component {

  constructor(props) {
    super(props);
    this.state = { localItem: this.props.listItem };
  }

  updateLocalItem = (e, type) => {
    let newItem = updateCarbs(e, type, this.state.localItem);
    this.setState({ localItem: newItem });
  };

  render() {
    if (!this.props.open) {
      return(<div></div>);
    }
    const {
      totalCarbs,
      breakfastCarbs,
      lunchCarbs,
      dinnerCarbs,
      otherCarbs,
      date
    } = this.state.localItem;
    return (
      <div>
        <Dialog
          fullScreen={false}
          open={this.props.open}
          onClose={() => {
            this.props.handleClose();
          }}
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
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                this.props.updateHistoryList(this.state.localItem);
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
