import * as background from "../ducks/background";
import * as camera from "../ducks/camera";
import * as color from "../ducks/color";
import * as logo from "../ducks/logo";
import * as lowerthirds from "../ducks/lowerthirds";
import * as storage from "../ducks/storage";
import * as testdata from "../ducks/testdata";

function strip(o) {
  let n = Object.assign({}, o, {
    "default": null
  });
  return n;
}

export default function init(store) {
  window.ACTIONS = {
    dispatch: store.dispatch,
    ducks: {
      background: strip(background),
      camera: strip(camera),
      color: strip(color),
      logo: strip(logo),
      lowerthirds: strip(lowerthirds),
      storage: strip(storage),
      testdata: strip(testdata)
    }
  }
}
