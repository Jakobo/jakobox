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
  setInOutBackground,
  setInOutLogoCubeColors,
  setInOutLogoTextColors,
  setInOutLogoBColors
} from "../../ducks/interstitial"

const InterstitialAdmin = (props) => {
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

const ConnectedInterstitialAdmin = connect(
  (state, ownProps) => {
    return {
      textStroke: state.interstitial.startStop.logo.text.stroke,
      textFill: state.interstitial.startStop.logo.text.fill,
      bStroke: state.interstitial.startStop.logo.b.stroke,
      bFill: state.interstitial.startStop.logo.b.fill,
      cubeStroke: state.interstitial.startStop.logo.cube.stroke,
      cubeFill: state.interstitial.startStop.logo.cube.fill,
      background: state.interstitial.startStop.background
    }
  },
  (dispatch) => {
    return {
      onChangeTextStroke: (c) => {
        dispatch(setInOutLogoTextColors(c, null))
      },
      onChangeTextFill: (c) => {
        dispatch(setInOutLogoTextColors(null, c))
      },
      onChangeBStroke: (c) => {
        dispatch(setInOutLogoBColors(c, null))
      },
      onChangeBFill: (c) => {
        dispatch(setInOutLogoBColors(null, c))
      },
      onChangeCubeStroke: (c) => {
        dispatch(setInOutLogoCubeColors(c, null))
      },
      onChangeCubeFill: (c) => {
        dispatch(setInOutLogoCubeColors(null, c))
      },
      onChangeBackground: (e, v) => {
        dispatch(setInOutBackground(v))
      }
    }
  }
)(Radium(InterstitialAdmin))

export default ConnectedInterstitialAdmin;
