import React, {Component} from "react"
import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import Popover from "material-ui/Popover"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"
import SceneSelect from "material-ui/svg-icons/hardware/videogame-asset"
import ComponentSelect from "material-ui/svg-icons/av/web"

// import CameraIcon from "material-ui/svg-icons/av/videocam"
// import FollowerIcon from "material-ui/svg-icons/action/speaker-notes"
// import LogoIcon from "material-ui/svg-icons/action/label"
// import LTIcon from "material-ui/svg-icons/content/low-priority"
// import OmniIcon from "material-ui/svg-icons/av/loop"
// import GenericIcon from "material-ui/svg-icons/action/dashboard"
// import NoIcon from "material-ui/svg-icons/toggle/check-box-outline-blank"

import { connect } from "react-redux"

import { setPanel } from "../../ducks/admin"

const alphaSort = (obj) => {
  return (a, b) => {
    const l = obj[a].toLowerCase()
    const r = obj[b].toLowerCase()
    return (l < r) ? -1 : (l > r) ? 1 : 0;
  }
}

const panels = {
  "brb": "BRB",
  "destiny": "Destiny",
  "generic": "Generic game",
  "incoming": "Stream incoming",
  "outgoing": "Stream outgoing"
}
const sortedPanels = Object.keys(panels).sort(alphaSort(panels))

class AdminAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorOpen: false,
      selectorEl: null,
    };
    ["openPanel",
     "closePanel",
     "choosePanel"
    ].forEach((n) => {
      this[n] = (this[n]) ? this[n].bind(this) : () => {};
    })
  }

  openPanel(event) {
    event.preventDefault();
    this.setState({
      selectorOpen: true,
      selectorEl: event.currentTarget,
    });
  }

  closePanel() {
    this.setState({
      selectorOpen: false,
    });
  }

  choosePanel(name) {
    this.props.choosePanel(name);
    this.closePanel();
  }

  render() {
    return (
      <div>
        <AppBar
          title={panels[this.props.currentPanel]}
          iconElementLeft={<IconButton><SceneSelect /></IconButton>}
          onLeftIconButtonTouchTap={this.openPanel}
        />
        <Popover open={this.state.selectorOpen}
                 anchorEl={this.state.selectorEl}
                 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 onRequestClose={this.closePanel}
        >
          <Menu>
            {sortedPanels.map((key) => {
              return (<MenuItem key={key} disabled={key === this.props.currentPanel} primaryText={panels[key]} onTouchTap={() => { this.choosePanel(key) }} />)
            })}
          </Menu>
        </Popover>
      </div>
    )
  }
}

const ConnectedAdminAppBar = connect(
  (state, ownProps) => {
    return {
      currentPanel: state.admin.panel
    }
  },
  (dispatch) => {
    return {
      choosePanel: (panel) => {
        dispatch(setPanel(panel))
      }
    }
  }
)(AdminAppBar)

export default ConnectedAdminAppBar;
