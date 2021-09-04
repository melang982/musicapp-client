function secondsToTime(seconds) {
  return new Date(1000 * seconds).toISOString().substr(15, 4);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export {
  secondsToTime,
  clamp
}