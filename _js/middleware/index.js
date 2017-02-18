import { doNotPropogate } from "./blocklist"

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
    // decorate unwrapped action w/ info so we know it was proxied
    let wrappedAction = JSON.parse(localStorage.getItem(storageKey()));
    wrappedAction.origin = "localstorage";
    if (!doNotPropogate(wrappedAction.action)) {
      store.dispatch(wrappedAction.action);
    }
  }
}
