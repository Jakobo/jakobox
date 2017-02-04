// data actions
export const REQUEST_COLORS = "REQUEST_COLORS"
export const RECEIVE_COLORS = "RECEIVE_COLORS"

function fetchColors(type) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_COLORS
    });

    // TODO
    // return getEngine(type).get()
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveData(type, json)))
  }
}

export function fetchDataIfNeeded(type) {
  if (!mapping[type]) {
    throw new Error("Unknown type: " + type);
  }
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), type)) {
      return dispatch(fetchData(type));
    }
  };
};
