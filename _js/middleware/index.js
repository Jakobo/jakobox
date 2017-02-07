const storagePrefix = "jakobox-";
let key = "";

function wrapAction(action) {
  return {
    action,
    time: Date.now(),
  }
}

function storageKey() {
  return (key) ? storagePrefix + key : null;
}

export function setStorageKey(newKey) {
  console.log(`Using Storage: ${newKey}`);
  key = newKey;
}

export function storageMiddleware() {
  if (storageKey() === null) {
    throw new Error("setStorageKey must be called first")
  }
  return () => next => action => {
    const wrappedAction = wrapAction(action);

    localStorage.setItem(
      storageKey(),
      JSON.stringify(wrappedAction)
    );

    next(action);
  };
}

export function createOnStorage(store) {
  if (storageKey() === null) {
    throw new Error("setStorageKey must be called first")
  }
  return () => {
    const wrappedAction = JSON.parse(localStorage.getItem(storageKey));
    store.dispatch(wrappedAction.action);
  }
}
