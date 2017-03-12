// peerjs middleware for redux
import Peer from "peerjs"
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

const connectClient = `client-${uuid()}`
const connectHost = `host`
let queue = [];

const clearQueue = () => {
  queue = [];
}

let enqueue = (action) => {
  queue.push(action);
};

const createPeerConnection = (store, key, isClient) => {
  let clients = {};

  // drain the queue
  const drain = () => {
    if (queue.length > 0) {
      const str = {
        fn: INCREMENTAL_STATE,
        queue: queue.slice(0)
      };
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
    client.send({
      fn: FULL_STATE,
      state: store.getState()
    });
  }

  const connectToHost = (after = 400, tries = 0) => {
    let seq = 0;
    let peer = new Peer(`${connectClient}-${seq}`, {key: key});
    let connected = false;
    window.setTimeout(() => {
      if (!connected) {
        console.log("Connection timeout. Retrying.");
        reconnect();
      }
    }, 3000);

    const reconnect = () => {
      // destroy the peer and close down gracefully
      if (!peer.destroyed) {
        peer.destroy();
      }
      // start a new connection and disconnect from thread
      window.setTimeout(() => {
        connectToHost(after, ++tries)
      }, after);
    }

    console.log(`Connection request to ${connectHost} from ${connectClient} w/ key:${key} (${tries})`);
    const connection = peer.connect(connectHost);
    connection.on("open", () => {
      console.log(`Connection request to ${connectHost} OK`);
      connected = true;
      after = 0;
    });
    connection.on("close", () => {
      console.log(`Disconnected from ${connectHost}. Resyncing.`);
      reconnect();
    })
    connection.on("data", (data) => {
      switch (data.fn) {
        case FULL_STATE:
          store.dispatch(sync(data.state));
        break;
        case INCREMENTAL_STATE:
          data.queue.forEach((item) => {
            store.dispatch(item);
          });
        break;
      }
    });
    peer.on("error", (err) => {
      switch (err.type) {
        case "peer-unavailable":
          reconnect();
        break;
        default:
          console.log(err);
        break;
      }
    });
  }

  const establishHost = () => {
    // host mode (any new client needs the current state tree)
    const peer = new Peer(connectHost, {key: key});
    peer.on("connection", (connection) => {
      connection.on("open", () => {
        console.log(`Connection established with ${connection.peer} w/ key:${key}`);
        clients[connection.peer] = connection;
        initializeClient(connection);
        drain();
      });
    });
    peer.on("error", (err) => {
      console.log(err.type, err);
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
