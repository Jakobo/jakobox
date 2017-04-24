import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

import Radium from "radium"

import ColorPicker from "../picker"
import MultilineText from "../multiline"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import DropDownMenu from "material-ui/DropDownMenu"
import MenuItem from "material-ui/MenuItem"
import SelectField from "material-ui/SelectField"

import {
  setBrbBackground,
  setBrbLogoCubeColors,
  setBrbLogoTextColors,
  setBrbLogoBColors
} from "../../ducks/interstitial"

const BrbAdmin = (props) => {
  const styles = {
    padded: {
      padding: "10px"
    },
    label: {
      fontSize: "13px",
      fontName: "Roboto, sans-serif",
      color: "#333",
      display: "block"
    },
    pair: {
      paddingTop: "10px"
    },
    h2: {
      fontSize: "16px",
      fontName: "Roboto, sans-serif",
      color: "#333",
      fontWeight: "bold",
      marginBottom: "16px",
      borderBottom: "1px solid #eee"
    }
  };

  return (
    <Paper zDepth={2} style={styles.padded}>
      <section style={styles.padded}>
        <h2 style={styles.h2}>Colors</h2>
        <div style={styles.pair}>
          <span style={styles.label}>Text:</span>
          <ColorPicker label={"Stroke"} color={props.textStroke} onChange={props.onChangeTextStroke} />
          <ColorPicker label={"Fill"} color={props.textFill} onChange={props.onChangeTextFill} />
        </div>
        <div style={styles.pair}>
          <span style={styles.label}>"B" icon:</span>
          <ColorPicker label={"Stroke"} color={props.bStroke} onChange={props.onChangeBStroke} />
          <ColorPicker label={"Fill"} color={props.bFill} onChange={props.onChangeBFill} />
        </div>
        <div style={styles.pair}>
          <span style={styles.label}>Cube:</span>
          <ColorPicker label={"Stroke"} color={props.cubeStroke} onChange={props.onChangeCubeStroke} />
          <ColorPicker label={"Fill"} color={props.cubeFill} onChange={props.onChangeCubeFill} />
        </div>
      </section>
      <section style={styles.padded}>
        <h2 style={styles.h2}>Demo Settings</h2>
        <TextField
          value={props.background}
          hintText={"Background URL or CSS value"}
          floatingLabelText={"Background URL/CSS"}
          fullWidth={true}
          onChange={props.onChangeBackground}
        />
      </section>
    </Paper>
  )
}

const ConnectedBrbAdmin = connect(
  (state, ownProps) => {
    return {
      textStroke: state.interstitial.brb.logo.text.stroke,
      textFill: state.interstitial.brb.logo.text.fill,
      bStroke: state.interstitial.brb.logo.b.stroke,
      bFill: state.interstitial.brb.logo.b.fill,
      cubeStroke: state.interstitial.brb.logo.cube.stroke,
      cubeFill: state.interstitial.brb.logo.cube.fill,
      background: state.interstitial.brb.background
    }
  },
  (dispatch) => {
    return {
      onChangeTextStroke: (c) => {
        dispatch(setBrbLogoTextColors(c, null))
      },
      onChangeTextFill: (c) => {
        dispatch(setBrbLogoTextColors(null, c))
      },
      onChangeBStroke: (c) => {
        dispatch(setBrbLogoBColors(c, null))
      },
      onChangeBFill: (c) => {
        dispatch(setBrbLogoBColors(null, c))
      },
      onChangeCubeStroke: (c) => {
        dispatch(setBrbLogoCubeColors(c, null))
      },
      onChangeCubeFill: (c) => {
        dispatch(setBrbLogoCubeColors(null, c))
      },
      onChangeBackground: (e, v) => {
        dispatch(setBrbBackground(v))
      }
    }
  }
)(Radium(BrbAdmin))

export default ConnectedBrbAdmin;
