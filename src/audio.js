import ss from 'socket.io-stream';
import io from 'socket.io-client';

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();

  return {
    audioContext,
    analyser
  };
};

const loadFile = (trackId, setStartedAt, setDuration) => {

  let source = null;
  let playWhileLoadingDuration = 0;
  let startAt = 0;
  let audioBuffer = null;
  let isPlaying = false;
  let activeSource = null;
  let pausedAt = 0; //seconds

  const {
    audioContext,
    analyser
  } = getAudioContext();
  const gainNode = audioContext.createGain();

  const playWhileLoading = (offset = 0) => {

    activeSource && activeSource.stop();
    source.connect(audioContext.destination);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    console.log('calling start');
    source.start(0, offset);
    activeSource = source;
    isPlaying = true;
  }

  const resume = (resumeTime = 0) => {
    console.log('resume ' + resumeTime)
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(audioContext.destination);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(0, resumeTime);
    activeSource = source;
  }

  const play = () => {
    console.log('play player, pausedAt: ' + pausedAt);
    isPlaying = true;
    startAt = new Date(Date.now() - pausedAt * 1000);
    setStartedAt(startAt)

    if (audioBuffer) resume(pausedAt);
    else playWhileLoading(pausedAt);

    pausedAt = 0;
  };

  const intervalTime = 400;

  const whileLoadingInterval = setInterval(() => {
    if (startAt) {
      //console.log('check, should play: ' + isPlaying);
      if (isPlaying) {
        const inSec = (Date.now() - startAt) / 1000;

        console.log('playWhileLoadingDuration: ' + playWhileLoadingDuration + ' inSec: ' + inSec);
        if (playWhileLoadingDuration && inSec >= (playWhileLoadingDuration - intervalTime * 0.001)) {
          playWhileLoading(inSec);
          playWhileLoadingDuration = source.buffer.duration;
        }
      }
    } else if (source) { //first time

      playWhileLoadingDuration = source.buffer.duration;

      startAt = Date.now();
      setStartedAt(startAt);
      playWhileLoading();
    }
  }, intervalTime);

  const stop = () => {
    activeSource && activeSource.stop(0);
    isPlaying = false;

    const elapsed = (Date.now() - startAt) / 1000;
    pausedAt = elapsed;
  };

  const setVolume = (level) => {
    level = level * 2 - 1;
    console.log(level);
    gainNode.gain.setValueAtTime(level, audioContext.currentTime);
  };

  let socket = io();

  console.log('test hello');
  socket.emit('track', trackId, () => {});
  ss(socket).on('track-stream', (stream, {
    stat
  }) => {
    const size = stat.size;
    let total = 0;

    console.log('audio file size: ' + size);
    stream.on('data', async (data) => { //chunk

      total = total + data.length;
      const loadProgress = total / size;
      //console.log(loadProgress);

      if (loadProgress >= 1) {
        console.log('fully loaded');
        clearInterval(whileLoadingInterval);
        audioBuffer = source.buffer;
        activeSource.stop();
        const inSec = (Date.now() - startAt) / 1000;
        resume(inSec);
      }

      const audioBufferChunk = await audioContext.decodeAudioData(withWaveHeader(data, 2, 44100));

      if (total == data.length && data.length > 0) { //first chunk

        const loadRate = data.length / size;
        const duration = (1 / loadRate) * audioBufferChunk.duration;
        console.log('CALCULATE DURATION: ' + duration);
        setDuration(duration)
      }


      const newaudioBuffer = (source && source.buffer) ?
        appendBuffer(source.buffer, audioBufferChunk, audioContext) :
        audioBufferChunk;

      source = audioContext.createBufferSource();
      source.buffer = newaudioBuffer;

    })
  });

  return {
    play,
    stop,
    setVolume
  };
}

function concat(buffer1, buffer2) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

  return tmp.buffer;
};

function appendBuffer(buffer1, buffer2, context) {
  const numberOfChannels = Math.min(buffer1.numberOfChannels, buffer2.numberOfChannels);
  const tmp = context.createBuffer(numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate);
  for (let i = 0; i < numberOfChannels; i++) {
    const channel = tmp.getChannelData(i);
    channel.set(buffer1.getChannelData(i), 0);
    channel.set(buffer2.getChannelData(i), buffer1.length);
  }
  return tmp;
};

function withWaveHeader(data, numberOfChannels, sampleRate) {
  const header = new ArrayBuffer(44);

  const d = new DataView(header);

  d.setUint8(0, "R".charCodeAt(0));
  d.setUint8(1, "I".charCodeAt(0));
  d.setUint8(2, "F".charCodeAt(0));
  d.setUint8(3, "F".charCodeAt(0));

  d.setUint32(4, data.byteLength / 2 + 44, true);

  d.setUint8(8, "W".charCodeAt(0));
  d.setUint8(9, "A".charCodeAt(0));
  d.setUint8(10, "V".charCodeAt(0));
  d.setUint8(11, "E".charCodeAt(0));
  d.setUint8(12, "f".charCodeAt(0));
  d.setUint8(13, "m".charCodeAt(0));
  d.setUint8(14, "t".charCodeAt(0));
  d.setUint8(15, " ".charCodeAt(0));

  d.setUint32(16, 16, true);
  d.setUint16(20, 1, true);
  d.setUint16(22, numberOfChannels, true);
  d.setUint32(24, sampleRate, true);
  d.setUint32(28, sampleRate * 1 * 2);
  d.setUint16(32, numberOfChannels * 2);
  d.setUint16(34, 16, true);

  d.setUint8(36, "d".charCodeAt(0));
  d.setUint8(37, "a".charCodeAt(0));
  d.setUint8(38, "t".charCodeAt(0));
  d.setUint8(39, "a".charCodeAt(0));
  d.setUint32(40, data.byteLength, true);

  return concat(header, data);
};

export {
  loadFile
}