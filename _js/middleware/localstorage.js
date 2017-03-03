// localstorage middleware for redux
import { sync } from "../ducks/global"
const uuid = () => {
  let d = (new Date()).getTime();
  d += (typeof performance !== "undefined" && typeof performance.now === "function") ? performance.now() : 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const FULL_STATE = "FULL_STATE"
const INCREMENTAL_STATE = "INCREMENTAL_STATE"
const NEW_CLIENT = "NEW_CLIENT"
const NEW_HOST = "NEW_HOST"

const connectClient = `client-${uuid()}`
const connectHost = `host`
let queue = [];

const lsbridge = ((w, ls) => {
  let listeners = [];

  w.addEventListener("storage", (evt) => {
    listeners.forEach((l) => {
      if (l.key === evt.key) {
        l.fn.call(w, JSON.parse(evt.newValue).data);
      }
    });
  });

  return {
    send: (key, s) => {
      ls.setItem(key, JSON.stringify({
        ts: (new Date()).getTime(),
        data: s
      }));
    },
    receive: (key, fn) => {
      listeners.push({key, fn});
    }
  }
})(window, window.localStorage);

const clearQueue = () => {
  queue = [];
}

let enqueue = (action) => {
  queue.push(action);
};

const createLocalStorageConnection = (store, key, isClient) => {
  // drain the queue
  const drain = () => {
    if (queue.length > 0) {
      lsbridge.send(key, {
        fn: INCREMENTAL_STATE,
        queue: queue.slice(0)
      });
      clearQueue();
    }
    window.setTimeout(() => {
      drain();
    }, 200);
  }

  const initializeClient = (client) => {
    lsbridge.send(key, {
      fn: FULL_STATE,
      state: store.getState()
    });
  }

  const connectToHost = () => {
    lsbridge.send(key, {
      fn: NEW_CLIENT,
      data: connectClient
    });
  }

  const establishHost = () => {
    drain();
    lsbridge.send(key, {
      fn: NEW_HOST,
      data: null
    });
  }

  if (isClient) {
    enqueue = () => {}; // disable queueing as a client
    clearQueue();
    connectToHost();
  }
  else {
    establishHost();
  }

  lsbridge.receive(key, (data) => {
    if (data.fn == NEW_CLIENT && !isClient) {
      initializeClient();
      return;
    }
    switch (data.fn) {
      case NEW_HOST:
        connectToHost();
      break;
      case INCREMENTAL_STATE:
        data.queue.forEach((item) => {
          store.dispatch(item);
        });
      break;
      case FULL_STATE:
        store.dispatch(sync(data.state));
      break;
    }
  });
}

// only sync over RTC events that are not local*
const shouldSend = (action) => {
  return (action.type.match(/^local\//)) ? false : true;
}

const lsMiddleware = store => next => action => {
  if (shouldSend(action)) {
    enqueue(action);
  }
  next(action);
}

export {lsMiddleware, createLocalStorageConnection};
