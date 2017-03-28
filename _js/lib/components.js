const objectAt = (state, at, notFound = {}) => {
  if (!at) {
    return notFound;
  }
  let found = true;
  let current = state;
  at.split(".").forEach((piece) => {
    if (current[piece]) {
      current = current[piece];
    }
    else {
      found = false;
      current = {};
    }
  });
  return (found) ? current : notFound;
}

const firstOf = (...opts) => {
  for(let i = 0; i < opts.length; i++) {
    if (typeof opts[i] !== "undefined" && opts[i] !== null) {
      return opts[i];
    }
  }
  return null;
}

export {objectAt, firstOf}
