import React, {Component} from "react"
import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import Popover from "material-ui/Popover"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"
import SceneSelect from "material-ui/svg-icons/hardware/videogame-asset"
import ComponentSelect from "material-ui/svg-icons/av/web"

import { connect } from "react-redux"

import { setScreen, setComponent } from "../../ducks/admin"

const alphaSort = (obj) => {
  return (a, b) => {
    const l = obj[a].toLowerCase()
    const r = obj[b].toLowerCase()
    return (l < r) ? -1 : (l > r) ? 1 : 0;
  }
}

const components = {
  "cam": "Webcam Frame",
  "follows": "Follower Notification",
  "logo": "Logo",
  "lowerthird": "Lower Thirds",
  "omnibar": "Omnibar",
  "generic": "Generic Game Settings"
}
const sortedComponents = Object.keys(components).sort(alphaSort(components))

const screens = {
  "brb": "BRB",
  "destiny": "Destiny",
  "generic": "Generic game",
  "incoming": "Stream incoming",
  "outgoing": "Stream outgoing"
}
const sortedScreens = Object.keys(screens).sort(alphaSort(screens))

class AdminAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorOpen: false,
      selectorEl: null,
      componentOpen: false,
      componentEl: null
    };
    ["openScene",
     "closeScene",
     "chooseScene",
     "openComponent",
     "closeComponent",
     "chooseComponent"
    ].forEach((n) => {
      this[n] = (this[n]) ? this[n].bind(this) : () => {};
    })
  }

  openScene(event) {
    event.preventDefault();
    this.setState({
      selectorOpen: true,
      selectorEl: event.currentTarget,
    });
  }

  closeScene() {
    this.setState({
      selectorOpen: false,
    });
  }

  chooseScene(name) {
    this.props.selectScene(name);
    this.closeScene();
  }

  openComponent(event) {
    event.preventDefault();
    this.setState({
      componentOpen: true,
      componentEl: event.currentTarget,
    });
  }

  closeComponent() {
    this.setState({
      componentOpen: false,
    });
  }

  chooseComponent(name) {
    this.props.selectComponent(name);
    this.closeComponent();
  }

  render() {
    return (
      <div>
        <AppBar
          title={screens[this.props.currentScene]}
          iconElementLeft={<IconButton><SceneSelect /></IconButton>}
          onLeftIconButtonTouchTap={this.openScene}
          iconElementRight={<IconButton><ComponentSelect /></IconButton>}
          onRightIconButtonTouchTap={this.openComponent}
        />
        <Popover open={this.state.selectorOpen}
                 anchorEl={this.state.selectorEl}
                 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 onRequestClose={this.closeScene}
        >
          <Menu>
            {sortedScreens.map((key) => {
              return (<MenuItem key={key} disabled={key === this.props.currentScene} primaryText={screens[key]} onTouchTap={() => { this.chooseScene(key) }} />)
            })}
          </Menu>
        </Popover>
        <Popover open={this.state.componentOpen}
                 anchorEl={this.state.componentEl}
                 anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'right', vertical: 'top'}}
                 onRequestClose={this.closeComponent}
        >
          <Menu>
            {sortedComponents.map((key) => {
              return (<MenuItem key={key} disabled={key === this.props.currentComponent} primaryText={components[key]} onTouchTap={() => { this.chooseComponent(key) }} />)
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
      currentScene: state.admin.screen,
      currentComponent: state.admin.component
    }
  },
  (dispatch) => {
    return {
      selectScene: (screen) => {
        dispatch(setScreen(screen))
      },
      selectComponent: (component) => {
        dispatch(setComponent(component))
      }
    }
  }
)(AdminAppBar)

export default ConnectedAdminAppBar;
