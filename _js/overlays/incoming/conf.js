import * as color from "../../ducks/color"
import * as logo from "../../ducks/logo"

export default function init(dispatch) {
  dispatch(color.setCubeColor("#fff", "#2A2A5C"))
  dispatch(color.setBColor("#000", "#151431"))
  dispatch(logo.setPosition(83, 343))
  dispatch(logo.setScale(3.8))
  dispatch(logo.showFullLogo())
}
