import React, {Component} from "react"
import { connect } from "react-redux"

import textColor from "../lib/textcolor"

import FlatButton from "material-ui/RaisedButton"
import Popover from "material-ui/Popover"
import { ChromePicker } from "react-color";

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    ["onButtonClick", "onRequestClose", "onChangeColor"].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    })
  }

  onButtonClick(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  onRequestClose() {
    this.setState({
      open: false,
    });
  }

  onChangeColor(color, evt) {
    const css = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    this.props.onChange(css, color);
  }

  render() {
    const style = {
      container: {
        display: "inline-block"
      }
    }

    return (<div style={style.container}>
      <FlatButton
        onTouchTap={this.onButtonClick}
        label={this.props.label}
        backgroundColor={this.props.color}
        labelColor={textColor(this.props.color)}
      />
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.onRequestClose}
      >
        <ChromePicker color={this.props.color} onChangeComplete={this.onChangeColor} />
      </Popover>
    </div>)
  }
}

export default Picker;
