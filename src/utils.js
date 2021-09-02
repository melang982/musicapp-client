function secondsToTime(seconds) {
  return new Date(1000 * seconds).toISOString().substr(15, 4);
}

export {
  secondsToTime
}