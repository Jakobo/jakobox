import React, {Component} from "react"
import { connect } from "react-redux"

import textColor from "../lib/textcolor"

import FlatButton from "material-ui/RaisedButton"
import Popover from "material-ui/Popover"
import { ChromePicker } from "react-color"

import ArtIcon from "material-ui/svg-icons/image/palette"

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
    const styles = {
      container: {
        display: "inline-block"
      },
      smallIcon: {
        width: 36,
        height: 36
      },
      label: {
        color: textColor(this.props.color || "#fff")
      }
    }

    return (<div style={styles.container}>
      <FlatButton
        label={this.props.label}
        labelStyle={styles.label}
        onTouchTap={this.onButtonClick}
        backgroundColor={this.props.color || "#fff"}
        >
        <ArtIcon color={textColor(this.props.color || "#fff")} iconStyle={styles.smallIcon} />
      </FlatButton>
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
