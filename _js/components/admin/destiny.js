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

import {
  setBackground,
  useFakeFollows,
  useLiveFollows,
  setPlaylist,
  setTickerItems,
  setTickerSize,
  setLogoCubeColors,
  setLogoTextColors,
  setLogoBColors,
  setCameraColors,
  showLowerThirds,
  hideLowerThirds
} from "../../ducks/destiny"

const DestinyAdmin = (props) => {
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
        <div>
          <span style={styles.label}>Text:</span>
          <ColorPicker label={"Stroke"} color={props.textStroke} onChange={props.onChangeTextStroke} />
          <ColorPicker label={"Fill"} color={props.textFill} onChange={props.onChangeTextFill} />
        </div>
        <div style={styles.pair}>
          <span style={styles.label}>"B" icon:</span>
          <ColorPicker label={"Stroke"} color={props.bStroke} onChange={props.onChangeBStroke} />
          <ColorPicker label={"Fill"} color={props.bFill} onChange={props.onChangebFill} />
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
            <section>
              <MultilineText
                label="Change Ticker Items"
                hintText="Long Line (newline) Short Line (newline) (blank line)"
                floatingLabelText="Ticker Items"
                fullWidth={true}
                value={(props.tickerItems || []).join("\n\n")}
                onChange={props.onChangeTickerItems}
              />
              <TextField
                value={props.tickerSize}
                hintText={"Number of Ticker Items"}
                floatingLabelText={"Maximum Number of Ticker Items"}
                fullWidth={true}
                onChange={props.onChangeTickerSize}
              />
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

const ConnectedDestinyAdmin = connect(
  (state, ownProps) => {
    return {
      textStroke: state.destiny.logo.text.stroke,
      textFill: state.destiny.logo.text.fill,
      bStroke: state.destiny.logo.b.stroke,
      bFill: state.destiny.logo.b.fill,
      cubeStroke: state.destiny.logo.cube.stroke,
      cubeFill: state.destiny.logo.cube.fill,
      showLowerThirds: state.destiny.lowerthirds.visible,
      currentPlaylist: state.destiny.lowerthirds.currentPlaylist,
      availablePlaylists: state.destiny.lowerthirds.availablePlaylists,
      tickerItems: state.destiny.lowerthirds.components.announcements.items,
      tickerSize: state.destiny.lowerthirds.components.announcements.size,
      fakeFollows: state.destiny.follows.fakeFollows,
      background: state.destiny.background
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
      onChangeTickerItems: (v) => {
        dispatch(setTickerItems(v))
      },
      onChangeFakeFollows: (e, t) => {
        dispatch((t) ? useFakeFollows() : useLiveFollows())
      },
      onChangeBackground: (e, v) => {
        dispatch(setBackground(v))
      }
    }
  }
)(Radium(DestinyAdmin))

export default ConnectedDestinyAdmin;
