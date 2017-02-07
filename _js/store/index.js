import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";

import camera from "../ducks/camera";
import color from "../ducks/color";
import logo from "../ducks/logo";
import lowerthirds from "../ducks/lowerthirds";
import storage from "../ducks/storage";
import testdata from "../ducks/testdata";

import {storageMiddleware} from '../middleware';

export default function() {
  const reducers = combineReducers({
    camera,
    color,
    logo,
    lowerthirds,
    storage,
    testdata
  });

  return createStore(
    reducers,
    applyMiddleware(
      storageMiddleware()
    )
  );
}
