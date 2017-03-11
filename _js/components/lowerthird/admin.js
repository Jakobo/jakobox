import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

import MultilineText from "../multiline"

import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

import {
  showLowerThirds,
  hideLowerThirds,
  setCurrentPlaylist,
  setTickerItems,
  setTickerSize,
  enableTickerShuffle,
  disableTickerShuffle
} from "../../ducks/lowerthirds"

const LogoAdmin = (props) => {
  const padded = {
    padding: "20px"
  };

  const panel = (<div>
    <DropDownMenu value={props.currentPlaylist} onChange={(e, i, v) => { props.onChangePlaylist(v, props.target) } }>
      {props.availablePlaylists.map((key) => {
        return (<MenuItem key={key} value={key} primaryText={key} label={`Playlist: ${props.currentPlaylist}`} />)
      })}
    </DropDownMenu>
    <Divider />
    <TextField value={props.tickerSize} hintText={"Ticker Size"} floatingLabelText={"Maximum Ticker Size"} onChange={(e, s) => { props.onChangeTickerSize(s, props.target) } } />
    <Toggle label="Shuffle Ticker" labelPosition="right" toggled={props.tickerShuffle} onToggle={(e, t) => { props.onChangeTickerShuffle(t, props.target) } } />
    <MultilineText
      label="Ticker Items"
      hintText="First Line\nSecond Line (blank line between)"
      floatingLabelText="Ticker Items (blank lines between)"
      value={props.tickerItems.join("\n\n")}
      onChange={(v) => { props.onChangeTickerItems(v, props.target) } }
    />
  </div>)

  return (
    <Paper zDepth={2} style={padded}>
      <Toggle
        label="Lower Thirds Visible"
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
      currentPlaylist: state.lowerthirds[state.admin.screen].currentPlaylist,
      availablePlaylists: state.lowerthirds[state.admin.screen].availablePlaylists,
      tickerSize: state.lowerthirds[state.admin.screen].ticker.subset,
      tickerShuffle: state.lowerthirds[state.admin.screen].ticker.shuffle,
      tickerItems: state.lowerthirds[state.admin.screen].ticker.items,
      visible: state.lowerthirds[state.admin.screen].visible
    }
  },
  (dispatch) => {
    const dispatchAt = (t, a) => {
      a.targetScreen = t;
      dispatch(a);
    }
    return {
      onChangePlaylist: (playlist, target) => {
        dispatchAt(target, setCurrentPlaylist(playlist))
      },
      onChangeTickerSize: (size, target) => {
        dispatchAt(target, setTickerSize(size))
      },
      onChangeTickerShuffle: (shuffle, target) => {
        dispatchAt(target, (shuffle) ? enableTickerShuffle() : disableTickerShuffle())
      },
      onChangeTickerItems: (items, target) => {
        dispatchAt(target, setTickerItems(items.split("\n\n")))
      },
      onChangeVisibility: (visible, target) => {
        dispatchAt(target, (visible) ? showLowerThirds() : hideLowerThirds())
      }
    }
  }
)(LogoAdmin)

export default ConnectedLogoAdmin;
