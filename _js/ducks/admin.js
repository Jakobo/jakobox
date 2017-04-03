export const SET_PANEL = "local/admin/SET_PANEL";

const initialState = {
  panel: "destiny"
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_PANEL:
      newState.panel = action.panel;
    break;
  }

  return newState;
}

export function setPanel(panel) {
  return {type: SET_PANEL, panel};
}
