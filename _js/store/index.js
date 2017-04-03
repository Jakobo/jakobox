import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";

import admin from "../ducks/admin";
import screen from "../ducks/screen";

import destiny from "../ducks/destiny";
import genscreen from "../ducks/generic";
import interstitial from "../ducks/interstitial";

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
    screen,
    destiny,
    interstitial,
    genscreen
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
