import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

import ColorPicker from "../picker"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"

import {
  showFullLogo,
  showOnlyBox,
  setPosition,
  showLogo,
  hideLogo,
  setScale,
  startInfiniteSpin,
  stopInfiniteSpin,
  spin,
  stopSpin,
  setCubeColor,
  setBColor,
  setTextColor
} from "../../ducks/logo"

const LogoAdmin = (props) => {
  const padded = {
    padding: "20px"
  };

  const panel = (<div>
    <Toggle label="Spin Box" labelPosition="right" toggled={props.spin} onToggle={(e, t) => { props.onChangeSpin(t, props.target) } } />
    <Toggle label="Spin Forever" labelPosition="right" toggled={props.infinte} onToggle={(e, t) => { props.onChangeInfiniteSpin(t, props.target) } } />
    <Toggle label="Show Full Logo" labelPosition="right" toggled={props.fullLogo} onToggle={(e, t) => { props.onChangeFullLogo(t, props.target) } } />
    <Divider />
    <TextField value={props.x} hintText={"0-1920"} floatingLabelText={"X Position: 0-1920"} onChange={(e, x) => { props.onChangePosition(x, null, props.target) } } />
    <TextField value={props.y} hintText={"0-1080"} floatingLabelText={"Y Position: 0-1080"} onChange={(e, y) => { props.onChangePosition(null, y, props.target) } } />
    <Divider />
    <TextField value={props.scale} hintText={"scale"} floatingLabelText={"Logo Scaling"} onChange={(e, s) => { props.onChangeScale(s, props.target) } } />
    <Divider />
    <ColorPicker label={"Text Stroke"} color={props.textStroke} onChange={(c) => { props.onChangeTextColor(c, null, props.target) } } />
    <ColorPicker label={"Fill"} color={props.textFill} onChange={(c) => { props.onChangeTextColor(null, c, props.target) } } />
    <Divider />
    <ColorPicker label={"Cube Stroke"} color={props.cubeStroke} onChange={(c) => { props.onChangeCubeColor(c, null, props.target) } } />
    <ColorPicker label={"Fill"} color={props.cubeFill} onChange={(c) => { props.onChangeCubeColor(null, c, props.target) } } />
    <Divider />
    <ColorPicker label={"B Stroke"} color={props.bStroke} onChange={(c) => { props.onChangeBColor(c, null, props.target) } } />
    <ColorPicker label={"Fill"} color={props.bFill} onChange={(c) => { props.onChangeBColor(null, c, props.target) } } />
  </div>)

  return (
    <Paper zDepth={2} style={padded}>
      <Toggle
        label="Logo Visible"
        labelPosition="right"
        toggled={props.visible}
        onToggle={(e, t) => { props.onChangeVisibility(t, props.target) } }
      />
      {props.visible ? (panel) : (null)}
    </Paper>
  )
};

const ConnectedLogoAdmin = connect(
  (state, ownProps) => {
    return {
      target: state.admin.screen,
      x: state.logo[state.admin.screen].x,
      y: state.logo[state.admin.screen].y,
      scale: state.logo[state.admin.screen].scale,
      spin: state.logo[state.admin.screen].spin,
      infinite: state.logo[state.admin.screen].infinite,
      fullLogo: state.logo[state.admin.screen].textLogo,
      textStroke: state.logo[state.admin.screen].text.stroke,
      textFill: state.logo[state.admin.screen].text.fill,
      cubeStroke: state.logo[state.admin.screen].cube.stroke,
      cubeFill: state.logo[state.admin.screen].cube.fill,
      bStroke: state.logo[state.admin.screen].b.stroke,
      bFill: state.logo[state.admin.screen].b.fill,
      visible: state.logo[state.admin.screen].visible
    }
  },
  (dispatch) => {
    const dispatchAt = (t, a) => {
      a.targetScreen = t;
      dispatch(a);
    }
    return {
      onChangePosition: (x, y, target) => {
        dispatchAt(target, setPosition(x, y))
      },
      onChangeSpin: (v, target) => {
        dispatchAt(target, (v) ? spin() : stopSpin())
      },
      onChangeInfiniteSpin: (v, target) => {
        dispatchAt(target, (v) ? startInfiniteSpin() : stopInfiniteSpin())
      },
      onChangeFullLogo: (v, target) => {
        dispatchAt(target, (v) ? showFullLogo() : showOnlyBox())
      },
      onChangeScale: (scale, target) => {
        dispatchAt(target, setScale(scale))
      },
      onChangeTextColor: (stroke, fill, target) => {
        dispatchAt(target, setTextColor(stroke, fill))
      },
      onChangeCubeColor: (stroke, fill, target) => {
        dispatchAt(target, setCubeColor(stroke, fill))
      },
      onChangeBColor: (stroke, fill, target) => {
        dispatchAt(target, setBColor(stroke, fill))
      },
      onChangeVisibility: (visible, target) => {
        dispatchAt(target, (visible) ? showLogo() : hideLogo())
      }
    }
  }
)(LogoAdmin)

export default ConnectedLogoAdmin;
