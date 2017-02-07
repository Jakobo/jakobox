import {setStorageKey as ssk} from "../middleware"

// has a side effect of changing the storage key. Does not change state
const initialState = {}

export default function reducer(state = initialState, action = {}) {
  return state;
}

export function setStorageKey(key) {
  ssk(key);
  return {}
}
