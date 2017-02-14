import { enableBatching } from "redux-batched-actions";

import * as color from "../../ducks/color"
import * as generic from "../../ducks/generic"
import * as lowerthirds from "../../ducks/lowerthirds"

export default function init(dispatch) {
  dispatch(color.setCameraColor("#fff", "#fff"))
  dispatch(lowerthirds.setCurrentPlaylist("normal"))
  dispatch(generic.setLayout(1, 1, false))
}
