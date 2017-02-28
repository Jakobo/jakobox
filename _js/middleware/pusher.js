// pusher JS middleware
import Pusher from "pusher-js"
import sha256 from "js-sha256"

const privatePrefix = "private-"
const clientPrefix = "client-"

let queue = [];

// sign a string against a secret
const sign = (str, secret) => {
  const ts = Date.getTime();
  const datedStr = ts + "." + str;
  const shaValue = sha256(datedStr + secret);
  return shaValue + "." + datedStr;
}

// verify a string against a secret
const verify = (fullStr, secret) => {
  let pieces = fullStr.split(".");
  const shaValue = pieces.shift();
  const ts = pieces.shift();
  const str = pieces.join(".");
  const datedStr = ts + "." + str;
  if (shaValue != sha256(datedStr + secret)) {
    return null;
  }
  return {
    str: str,
    ts: parseInt(ts)
  }
}

// only send non-local events or events without the "pusher" flag set
// the "pusher" flag prevents infinite cycles
const shouldSend = (action) => {
  return (action.type.match(/^local\//)) || action.pusher) ? false : true;
}

// begin draining the queue on 200ms interval
const startQueue = (channel, eventName, secret) => {
  const drain = () => {
    if (queue.length > 0) {
      const str = JSON.stringify(queue);
      queue = [];
      channel.trigger(clientPrefix + eventName, sign(str, secret));
    }
    window.setTimeout(() => {
      drain();
    }, 200);
  }
  drain();
}

export function pusherMiddleware() {
  return () => next => action => {
    if (shouldSend(action)) {
      queue.push(action);
    }
    next(action);
  };
}

export function createPusher(store, pusherConfig, secret) {
  let lasttime = 0;
  let pusher = new Pusher(pusherConfig.key, {
    encrypted: true
  });
  let channel = pusher.subscribe(privatePrefix + pusherConfig.channel);
  channel.bind(clientPrefix + pusherConfig.event, (data) => {
    const message = verify(data.message, secret);
    if (message && message.ts > lastTime) { // prevent replays
      lastTime = message.ts;
      const actions = JSON.parse(message.str);
      actions.forEach((action) => {
        action.pusher = true; // prevent infinite loops
        store.dispatch(action);
      });
    }
  });
  channel.bind("pusher:subscription_succeeded", () => {
    startQueue(channel, pusherConfig.event, secret)
  });
}
