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

import {setStorageKey, storageMiddleware} from '../middleware';

import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

const loggerMiddleware = createLogger();

export default function(key) {
  const reducers = combineReducers({
    camera,
    color,
    logo,
    lowerthirds,
    storage,
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
