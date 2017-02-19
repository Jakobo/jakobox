import * as color from "../../ducks/color"
import * as logo from "../../ducks/logo"

const makeDispatch = (screen, dispatch) => {
  return (action) => {
    action.targetScreen = screen;
    dispatch(action);
  }
}

export default function init(originalDispatch) {
  const dispatch = makeDispatch("brb", originalDispatch);

  dispatch(color.setCubeColor("#fff", "#45548e"))
  dispatch(color.setBColor("rgba(255, 255, 255, 0.8)", "#45548e"))
  dispatch(logo.setPosition(83, 343))
  dispatch(logo.setScale(3.8))
  dispatch(logo.showFullLogo())
}
