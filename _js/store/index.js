import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";

import admin from "../ducks/admin";
import background from "../ducks/background";
import camera from "../ducks/camera";
import color from "../ducks/color";
import follows from "../ducks/follows";
import generic from "../ducks/generic";
import global from "../ducks/global";
import logo from "../ducks/logo";
import lowerthirds from "../ducks/lowerthirds";
import screen from "../ducks/screen";

import {setStorageKey, storageMiddleware} from '../middleware';

import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

const loggerMiddleware = createLogger();

export default function(key) {
  const reducers = combineReducers({
    screen,
    admin,
    background,
    camera,
    color,
    follows,
    generic,
    logo,
    lowerthirds
  });

  // The relayReducer passes the last set screen information in to subsequent
  // actions. This way, they are operating on an action relative to the current
  // screen (if they choose to)

  const relayReducer = (state = {}, action = {}) => {
    // target screen is set with a helper
    // action.targetScreen = (state.screen && state.screen.current) ? state.screen.current : "default";
    return reducers(state, action);
  }

  if (key) {
    setStorageKey(key);
  }

  return createStore(
    relayReducer,
    applyMiddleware(
      storageMiddleware(),
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
