import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

import { batchActions } from "redux-batched-actions";

import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"

import { setLayout } from "../../ducks/generic"

const GenericAdmin = (props) => {
  const padded = {
    padding: "20px"
  };

  return (
    <Paper zDepth={2} style={padded}>
      <TextField value={props.camera} hintText={"1-10"} floatingLabelText={"Camera Position"} onChange={(e, p) => { props.onChangeGeneric(p, props.logo, props.textLogo, props.target) } } />
      <TextField value={props.logo} hintText={"1-10"} floatingLabelText={"Logo Position"} onChange={(e, p) => { props.onChangeGeneric(props.camera, p, props.textLogo, props.target) } } />
      <Toggle label="Use Text Logo" labelPosition="right" toggled={props.textLogo} onToggle={(e, t) => { props.onChangeGeneric(props.camera, props.logo, t, props.target) } } />
    </Paper>
  )
};

const ConnectedGenericAdmin = connect(
  (state, ownProps) => {
    return {
      target: state.admin.screen,
      camera: state.generic[state.admin.screen].cam,
      logo: state.generic[state.admin.screen].logo,
      textLogo: state.logo[state.admin.screen].textLogo
    }
  },
  (dispatch) => {
    const dispatchAt = (t, a) => {
      if (Array.isArray(a)) {
        a.map((item) => {
          item.targetScreen = t;
          return item;
        })
        dispatch(batchActions(a))
      }
      else {
        a.targetScreen = t;
        dispatch(a);
      }
    }
    return {
      onChangeGeneric: (camera, logo, fullLogo, target) => {
        console.log(setLayout(camera, logo, fullLogo))
        dispatchAt(target, setLayout(camera, logo, fullLogo))
      }
    }
  }
)(GenericAdmin)

export default ConnectedGenericAdmin;
