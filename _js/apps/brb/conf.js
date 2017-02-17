import * as color from "../../ducks/color"

export default function init(dispatch) {
  dispatch(color.setCubeColor("#fff", "#45548e"))
  dispatch(color.setBColor("rgba(255, 255, 255, 0.8)", "#45548e"))
}