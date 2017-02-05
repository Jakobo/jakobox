const storageKey = "jakobox-store";

function wrapAction(action) {
  return {
    action,
    time: Date.now(),
  }
}

export function storageMiddleware() {
  return () => next => action => {
    const wrappedAction = wrapAction(action);

    localStorage.setItem(
      storageKey,
      JSON.stringify(wrappedAction)
    );

    next(action);
  };
}

export function createOnStorage(store) {
  return () => {
    const wrappedAction = JSON.parse(localStorage.getItem(storageKey));
    store.dispatch(wrappedAction.action);
  }
}
