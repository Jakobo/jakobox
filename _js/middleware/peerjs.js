// peerjs middleware for redux
import Peer from "peerjs"


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

const connectClient = `client-${uuid()}`
let queue = [];

const clearQueue = () => {
  queue = [];
}

let enqueue = (action) => {
  queue.push(action);
};

const createPeerConnection = (store, host, key, isClient) => {
  let peer = new Peer((isClient) ? connectClient : host, {key: key});
  let clients = {};

  // drain the queue
  const drain = () => {
    if (queue.length > 0) {
      const str = JSON.stringify({
        fn: INCREMENTAL_STATE,
        queue: queue
      });
      clearQueue();
      Object.keys(clients).forEach((id) => {
        clients[id].send(str);
      });
    }
    window.setTimeout(() => {
      drain();
    }, 200);
  }

  const initializeClient = (client) => {
    const str = JSON.stringify({
      fn: FULL_STATE,
      state: store.getState()
    });
    client.send(str);
  }

  if (isClient) { // client mode
    enqueue = () => {}; // disable queueing as a client
    clearQueue();

    const connection = peer.connect(host);
    console.log(`Connection request to ${host} from ${connectClient} w/ key:${key}`);

    connection.on("open", () => {
      console.log(`Connection request to ${host} OK`);
    })

    connection.on("data", (d) => {
      const data = JSON.parse(d);
      switch (data.fn) {
        case FULL_STATE:
          store.setState(data.state);
        break;
        case INCREMENTAL_STATE:
          data.queue.forEach((item) => {
            store.dispatch(item);
          });
        break;
      }
    });
  }
  else { // host mode (any new client needs the current state tree)
    peer.on("connection", (connection) => {
      console.log(`Connection established with ${connection.peer} w/ key:${key}`);
      clients[connection.peer] = connection;
      initializeClient(connection);
      drain();
    });
  }

  peer.on("error", (err) => {
    // TODO: switch on err.type
    // peer-unavailable - Peer no longer exists. If host, remove from pool
    console.log(err);
  });
  peer.on("disconnected", () => {
    // wait a certain amount of time, then...
    window.setTimeout(() => {
      peer.reconnect();
    }, 200);
  });
}

// only sync over RTC events that are not local*
const shouldSend = (action) => {
  return (action.type.match(/^local\//)) ? false : true;
}

const peerMiddleware = store => next => action => {
  if (shouldSend(action)) {
    enqueue(action);
  }
  next(action);
}

export {peerMiddleware, createPeerConnection};
