const RESET_ALL = "global/reset";
const SYNC_ALL = "global/sync";

export default function reducer(state = initialState, action = {}) {
  return state;
}

export const RESET = RESET_ALL;
export const SYNC = SYNC_ALL;

export function reset() {
  return {type: RESET_ALL};
}

export function sync(newState) {
  return {type: SYNC_ALL, newState};
}
