/**
 * Generic Cam Layout
 * A generic cam that can be used in more than one layout
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

import ColorPicker from "../picker"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"

import {
  setMainColor,
  setAccentColor,
  setXPosition,
  setYPosition,
  showCamera,
  hideCamera
} from "../../ducks/camera"

const CamAdmin = (props) => {
  const padded = {
    padding: "20px"
  };

  const panel = (<div>
    <TextField value={props.x} hintText={"0-1920"} floatingLabelText={"X Position: 0-1920"} onChange={(e, x) => { props.onChangeX(x, props.target) } } />
    <TextField value={props.y} hintText={"0-1080"} floatingLabelText={"Y Position: 0-1080"} onChange={(e, y) => { props.onChangeY(y, props.target) } } />
    <Divider />
    <ColorPicker label={"Main"} color={props.color} onChange={(c) => { props.onChangeMainColor(c, props.target) } } />
    <ColorPicker label={"Accent"} color={props.accent} onChange={(c) => { props.onChangeAccentColor(c, props.target) } } />
  </div>)

  return (
    <Paper zDepth={2} style={padded}>
      <Toggle
        label="Camera Visible"
        labelPosition="right"
        toggled={props.visible}
        onToggle={(e, t) => { props.onChangeVisibility(t, props.target) } }
      />
      {props.visible ? (panel) : (null)}
    </Paper>
  )
};

const ConnectedCamAdmin = connect(
  (state, ownProps) => {
    return {
      target: state.admin.screen,
      color: state.camera[state.admin.screen].color.main,
      accent: state.camera[state.admin.screen].color.accent,
      x: state.camera[state.admin.screen].x,
      y: state.camera[state.admin.screen].y,
      visible: state.camera[state.admin.screen].visible
    }
  },
  (dispatch) => {
    const dispatchAt = (t, a) => {
      a.targetScreen = t;
      dispatch(a);
    }
    return {
      onChangeMainColor: (color, target) => {
        dispatchAt(target, setMainColor(color))
      },
      onChangeAccentColor: (color, target) => {
        dispatchAt(target, setAccentColor(color))
      },
      onChangeX: (x, target) => {
        dispatchAt(target, setXPosition(x))
      },
      onChangeY: (y, target) => {
        dispatchAt(target, setYPosition(y))
      },
      onChangeVisibility: (visible, target) => {
        dispatchAt(target, (visible) ? showCamera() : hideCamera())
      }
    }
  }
)(CamAdmin)

export default ConnectedCamAdmin;
