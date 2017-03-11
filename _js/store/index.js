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

import params from "../lib/url"

import {peerMiddleware} from "../middleware/peerjs";
import {lsMiddleware} from "../middleware/localstorage";
import {enableBatching} from "redux-batched-actions";

import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

const loggerMiddleware = createLogger();

export default function() {
  const reducers = combineReducers({
    admin,
    background,
    camera,
    follows,
    generic,
    logo,
    lowerthirds,
    screen
  });

  return createStore(
    enableBatching(reducers),
    applyMiddleware(
      (params.ls) ? lsMiddleware : peerMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
