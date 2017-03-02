import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";

import admin from "../ducks/admin";
import background from "../ducks/background";
import camera from "../ducks/camera";
import follows from "../ducks/follows";
import generic from "../ducks/generic";
import global from "../ducks/global";
import logo from "../ducks/logo";
import lowerthirds from "../ducks/lowerthirds";
import screen from "../ducks/screen";

// import {setStorageKey, storageMiddleware} from '../middleware';
import {peerMiddleware} from "../middleware/peerjs";

import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

const loggerMiddleware = createLogger();

export default function() {
  const reducers = combineReducers({
    screen,
    admin,
    background,
    camera,
    follows,
    generic,
    logo,
    lowerthirds
  });

  return createStore(
    reducers,
    applyMiddleware(
      peerMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
