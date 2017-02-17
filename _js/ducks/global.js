const RESET_ALL = "global/reset";

export default function reducer(state = initialState, action = {}) {
  return state;
}

export const RESET = RESET_ALL;

export function reset() {
  return {type: RESET_ALL};
}
