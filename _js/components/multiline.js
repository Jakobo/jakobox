import React, {Component} from "react"
import { connect } from "react-redux"

import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"
import Dialog from "material-ui/Dialog";

class MultilineText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value
    };
    ["onOpenDialog", "onRequestClose", "onChangeText", "onRequestComplete"].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    })
  }

  onOpenDialog(event) {
    event.preventDefault();
    this.setState(Object.assign({}, this.state, {
      open: true
    }))
  }

  onRequestClose() {
    this.setState(Object.assign({}, this.state, {
      open: false
    }))
  }

  onChangeText(evt, value) {
    this.setState(Object.assign({}, this.state, {
      value: value
    }))
  }

  onRequestComplete() {
    this.onRequestClose();
    this.props.onChange(this.state.value);
  }

  render() {
    const style = {
      container: {
        display: "inline-block"
      }
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.onRequestClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.onRequestComplete}
      />,
    ];

    return (<div style={style.container}>
      <RaisedButton onTouchTap={this.onOpenDialog} label={this.props.label} />
      <Dialog title={`Changing ${this.props.label}`}
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        <TextField
          hintText={this.props.hintText}
          floatingLabelText={this.props.floatingLabelText}
          multiLine={true}
          rows={6}
          rowsMax={6}
          fullWidth={true}
          defaultValue={this.props.value}
          onChange={this.onChangeText}
        />
      </Dialog>
    </div>)
  }
}

export default MultilineText;
