function secondsToTime(seconds) {
  return new Date(1000 * seconds).toISOString().substr(15, 4);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export {
  secondsToTime,
  clamp,
  shuffle
}