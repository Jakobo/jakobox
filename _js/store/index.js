import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";

import background from "../ducks/background";
import camera from "../ducks/camera";
import color from "../ducks/color";
import follows from "../ducks/follows";
import generic from "../ducks/generic";
import global from "../ducks/global";
import logo from "../ducks/logo";
import lowerthirds from "../ducks/lowerthirds";
import screen from "../ducks/screen";
import testdata from "../ducks/testdata";

import {setStorageKey, storageMiddleware} from '../middleware';

import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

const loggerMiddleware = createLogger();

export default function(key) {
  const reducers = combineReducers({
    background,
    camera,
    color,
    follows,
    generic,
    logo,
    lowerthirds,
    screen,
    testdata
  });

  if (key) {
    setStorageKey(key);
  }

  return createStore(
    reducers,
    applyMiddleware(
      storageMiddleware(),
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
