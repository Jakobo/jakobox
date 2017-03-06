/**
 * Generic Cam Layout
 * A generic cam that can be used in more than one layout
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"

import {
  setLiveUrl,
  setFakeUrl,
  setXPosition,
  setYPosition,
  setWidth,
  setHeight,
  showFollows,
  hideFollows
} from "../../ducks/follows"

const FollowAdmin = (props) => {
  const padded = {
    padding: "20px"
  };

  const panel = (<div>
    <TextField value={props.x} hintText={"0-1920"} floatingLabelText={"X Position: 0-1920"} onChange={(e, x) => { props.onChangeX(x, props.target) } } />
    <TextField value={props.y} hintText={"0-1080"} floatingLabelText={"Y Position: 0-1080"} onChange={(e, y) => { props.onChangeY(y, props.target) } } />
    <Divider />
    <TextField value={props.width} hintText={"width"} floatingLabelText={"Frame Width"} onChange={(e, w) => { props.onChangeWidth(w, props.target) } } />
    <TextField value={props.height} hintText={"height"} floatingLabelText={"Frame Height"} onChange={(e, h) => { props.onChangeHeight(h, props.target) } } />
    <Divider />
    <TextField value={props.liveUrl} hintText={"http://..."} floatingLabelText={"Live URL"} onChange={(e, u) => { props.onChangeLiveUrl(u, props.target) } } />
    <TextField value={props.fakeUrl} hintText={"http://..."} floatingLabelText={"Fake URL"} onChange={(e, u) => { props.onChangeFakeUrl(u, props.target) } } />
  </div>)

  return (
    <Paper zDepth={2} style={padded}>
      <Toggle
        label="Follows Visible"
        labelPosition="right"
        toggled={props.visible}
        onToggle={(e, t) => { props.onChangeVisibility(t, props.target) } }
      />
      {props.visible ? (panel) : (null)}
    </Paper>
  )
};

const ConnectedFollowAdmin = connect(
  (state, ownProps) => {
    return {
      target: state.admin.screen,
      x: state.follows[state.admin.screen].x,
      y: state.follows[state.admin.screen].y,
      width: state.follows[state.admin.screen].width,
      height: state.follows[state.admin.screen].height,
      liveUrl: state.follows[state.admin.screen].liveUrl,
      fakeUrl: state.follows[state.admin.screen].fakeUrl,
      visible: state.follows[state.admin.screen].visible
    }
  },
  (dispatch) => {
    const dispatchAt = (t, a) => {
      a.targetScreen = t;
      dispatch(a);
    }
    return {
      onChangeX: (x, target) => {
        dispatchAt(target, setXPosition(x))
      },
      onChangeY: (y, target) => {
        dispatchAt(target, setYPosition(y))
      },
      onChangeWidth: (w, target) => {
        dispatchAt(target, setWidth(w))
      },
      onChangeHeight: (h, target) => {
        dispatchAt(target, setHeight(h))
      },
      onChangeLiveUrl: (u, target) => {
        dispatchAt(target, setLiveUrl(u))
      },
      onChangeFakeUrl: (u, target) => {
        dispatchAt(target, setFakeUrl(u))
      },
      onChangeVisibility: (visible, target) => {
        dispatchAt(target, (visible) ? showCamera() : hideCamera())
      }
    }
  }
)(FollowAdmin)

export default ConnectedFollowAdmin;
