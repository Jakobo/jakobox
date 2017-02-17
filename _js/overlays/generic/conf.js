import * as color from "../../ducks/color"
import * as generic from "../../ducks/generic"
import * as global from "../../ducks/global"
import * as logo from "../../ducks/logo"
import * as lowerthirds from "../../ducks/lowerthirds"

export default function init(dispatch) {
  dispatch(global.reset())
  dispatch(color.setCameraColor("#fff", "#fff"))
  dispatch(color.setBColor("#000", "#fff"))
  dispatch(color.setCubeColor("#000", "#fff"))
  dispatch(color.setTextColor("#000", "#fff"))
  dispatch(lowerthirds.setCurrentPlaylist("normal"))
  dispatch(lowerthirds.hideLowerThirds())
  dispatch(logo.startInfiniteSpin())
  dispatch(logo.setScale(1))

  // generic returns a collection of dispatches for its layout
  generic.setLayout(1, 1, false).forEach((action) => {
    dispatch(action);
  })
}
