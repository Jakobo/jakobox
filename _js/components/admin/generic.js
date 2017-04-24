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
  setBackground,
  useFakeFollows,
  useLiveFollows,
  setPlaylist,
  setLogoCubeColors,
  setLogoTextColors,
  setLogoBColors,
  setCameraColors,
  showLowerThirds,
  hideLowerThirds,
  setConfiguration
} from "../../ducks/generic"

const GenericAdmin = (props) => {
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
        <h2 style={styles.h2}>Layout</h2>
        <SelectField floatingLabelText="Camera Position" value={props.camera} onChange={props.onChangeCameraPosition}>
          <MenuItem value={1} primaryText="Top, Left" />
          <MenuItem value={2} primaryText="Top, Middle" />
          <MenuItem value={3} primaryText="Top, Right" />
          <MenuItem value={4} primaryText="1/3 Top, Left" />
          <MenuItem value={5} primaryText="1/3 Top, Right" />
          <MenuItem value={6} primaryText="2/3 Top, Left" />
          <MenuItem value={7} primaryText="2/3 Top, Right" />
          <MenuItem value={8} primaryText="Bottom, Left" />
          <MenuItem value={9} primaryText="Bottom, Middle" />
          <MenuItem value={10} primaryText="Bottom, Right" />
        </SelectField>
        <SelectField floatingLabelText="Logo Position" value={props.logo} onChange={props.onChangeLogoPosition}>
          <MenuItem value={1} primaryText="Top, Left" />
          <MenuItem value={2} primaryText="Top, Middle" />
          <MenuItem value={3} primaryText="Top, Right" />
          <MenuItem value={4} primaryText="1/3 Top, Left" />
          <MenuItem value={5} primaryText="1/3 Top, Right" />
          <MenuItem value={6} primaryText="2/3 Top, Left" />
          <MenuItem value={7} primaryText="2/3 Top, Right" />
          <MenuItem value={8} primaryText="Bottom, Left" />
          <MenuItem value={9} primaryText="Bottom, Middle" />
          <MenuItem value={10} primaryText="Bottom, Right" />
        </SelectField>
      </section>
      <section style={styles.padded}>
        <h2 style={styles.h2}>Colors</h2>
        <div>
          <span style={styles.label}>Camera:</span>
          <ColorPicker label={"Main"} color={props.cameraMain} onChange={props.onChangeCameraMain} />
          <ColorPicker label={"Accent"} color={props.cameraAccent} onChange={props.onChangeCameraAccent} />
        </div>
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
        <h2 style={styles.h2}>Lower Thirds</h2>
        <section>
          <Toggle
            label="Show Lower Thirds"
            labelPosition="right"
            toggled={props.showLowerThirds}
            onToggle={props.onChangeLowerThirdsVisibility}
          />
        </section>
        {(props.showLowerThirds) &&
          <div>
            <section style={styles.pair}>
              <span style={styles.label}>Playlist:</span>
              <DropDownMenu value={props.currentPlaylist} onChange={props.onChangePlaylist}>
                {(props.availablePlaylists || []).map((key) => {
                  return (<MenuItem key={key} value={key} primaryText={key} label={`${props.currentPlaylist}`} />)
                })}
              </DropDownMenu>
            </section>
          </div>
        }
      </section>
      <section style={styles.padded}>
        <h2 style={styles.h2}>Demo Settings</h2>
        <Toggle
          label="Use Fake Follows"
          labelPosition="right"
          toggled={props.fakeFollows}
          onToggle={props.onChangeFakeFollows}
        />
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

const ConnectedGenericAdmin = connect(
  (state, ownProps) => {
    return {
      textStroke: state.genscreen.logo.text.stroke,
      textFill: state.genscreen.logo.text.fill,
      bStroke: state.genscreen.logo.b.stroke,
      bFill: state.genscreen.logo.b.fill,
      cubeStroke: state.genscreen.logo.cube.stroke,
      cubeFill: state.genscreen.logo.cube.fill,
      showLowerThirds: state.genscreen.lowerthirds.visible,
      currentPlaylist: state.genscreen.lowerthirds.currentPlaylist,
      availablePlaylists: state.genscreen.lowerthirds.availablePlaylists,
      fakeFollows: state.genscreen.follows.fakeFollows,
      background: state.genscreen.background
    }
  },
  (dispatch) => {
    return {
      onChangeTextStroke: (c) => {
        dispatch(setLogoTextColors(c, null))
      },
      onChangeTextFill: (c) => {
        dispatch(setLogoTextColors(null, c))
      },
      onChangeBStroke: (c) => {
        dispatch(setLogoBColors(c, null))
      },
      onChangeBFill: (c) => {
        dispatch(setLogoBColors(null, c))
      },
      onChangeCubeStroke: (c) => {
        dispatch(setLogoCubeColors(c, null))
      },
      onChangeCubeFill: (c) => {
        dispatch(setLogoCubeColors(null, c))
      },
      onChangeLowerThirdsVisibility: (e, t) => {
        dispatch((t) ? showLowerThirds() : hideLowerThirds())
      },
      onChangePlaylist: (e, i, v) => {
        dispatch(setPlaylist(v))
      },
      onChangeFakeFollows: (e, t) => {
        dispatch((t) ? useFakeFollows() : useLiveFollows())
      },
      onChangeBackground: (e, v) => {
        dispatch(setBackground(v))
      }
    }
  }
)(Radium(GenericAdmin))

export default ConnectedGenericAdmin;
