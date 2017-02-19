import * as color from "../../ducks/color"
import * as generic from "../../ducks/generic"
import * as logo from "../../ducks/logo"
import * as lowerthirds from "../../ducks/lowerthirds"

const makeDispatch = (screen, dispatch) => {
  return (action) => {
    action.targetScreen = screen;
    dispatch(action);
  }
}

export default function init(originalDispatch) {
  const dispatch = makeDispatch("generic", originalDispatch);

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
