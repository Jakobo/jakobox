import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";

import camera from "../ducks/camera";
import color from "../ducks/color";
import logo from "../ducks/logo";
import lowerthirds from "../ducks/lowerthirds";
import testdata from "../ducks/testdata";

import {storageMiddleware} from '../middleware/localstorage';

export default function() {
  const reducers = combineReducers({
    cursor,
    map,
    slider,
    text
  });

  return createStore(
    reducers,
    applyMiddleware(
      storageMiddleware()
    )
  );
}
