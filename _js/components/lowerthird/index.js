/**
 * Lower Thirds
 * Creates a bottom-right Lower Thirds based on the `Box` logo.
 * Playlists can be added to LowerThirds, and it will handle dispatching
 * the correct component with an onComplete callback to handle the next item
 * in the playlist.
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

const logoStyle = {
  left: "1800px",
  top: "960px",
  position: "absolute"
};

const shift = (val, by) => {
  return (parseInt(val) + by) + "px"
}

const posX = (by) => {
  return shift(logoStyle.left, by);
}

const posY = (by) => {
  return shift(logoStyle.top, by);
}

// for now, going to let each LowerThird keep a localized state object
// long term, this state should go into the redux store, but let's limit
// the number of moving parts
class LowerThird extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.cachebreak = 0;
    this.onComplete = this.onComplete.bind(this);
  }

  onComplete() {
    // attempt to select the next component
    let newState = Object.assign({}, this.state);
    newState.current = newState.current + 1;
    if (newState.current >= this.props.playlist.length) {
      newState.current = 0;
    }

    this.setState(newState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playlist !== nextProps.playlist) {
      this.setState(Object.assign({}, this.state, {
        current: 0
      }));
    }
  }

  render() {
    if (this.props.playlist.length === 0) {
      return null;
    }
    if (!this.props.visible) {
      return null;
    }

    const Component = this.props.playlist[this.state.current];
    return <div><Component key={this.cachebreak++} onComplete={this.onComplete} posX={posX} posY={posY} logoStyle={logoStyle} /></div>
  }
}

const ConnectedLowerThird = connect(
  (state, ownProps) => {
    return {
      playlist: ownProps.playlists[state.lowerthirds[state.screen.current].currentPlaylist] || [],
      visible: state.lowerthirds[state.screen.current].visible
    }
  }
)(LowerThird);

export default ConnectedLowerThird;
