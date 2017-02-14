import * as background from "../ducks/background";
import * as camera from "../ducks/camera";
import * as color from "../ducks/color";
import * as follows from "../ducks/follows";
import * as generic from "../ducks/generic";
import * as logo from "../ducks/logo";
import * as lowerthirds from "../ducks/lowerthirds";
import * as screen from "../ducks/screen";
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
      follows: strip(follows),
      generic: strip(generic),
      logo: strip(logo),
      lowerthirds: strip(lowerthirds),
      screen: strip(screen),
      storage: strip(storage),
      testdata: strip(testdata)
    }
  }
}
