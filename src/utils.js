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


const TimeAgo = (function() {
  let self = {};

  // Public Methods
  self.locales = {
    prefix: '',
    sufix: 'ago',

    seconds: 'less than a minute',
    minute: '1 minute',
    minutes: '%d minutes',
    hour: '1 hour',
    hours: 'about %d hours',
    day: '1 day',
    days: '%d days',
    month: '1 month',
    months: '%d months',
    year: '1 year',
    years: '%d years'
  };

  self.inWords = function(timeAgo) {
    let seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
      separator = this.locales.separator || ' ',
      words = this.locales.prefix + separator,
      interval = 0,
      intervals = {
        year: seconds / 31536000,
        month: seconds / 2592000,
        day: seconds / 86400,
        hour: seconds / 3600,
        minute: seconds / 60
      };

    let distance = this.locales.seconds;

    for (let key in intervals) {
      interval = Math.floor(intervals[key]);

      if (interval > 1) {
        distance = this.locales[key + 's'];
        break;
      } else if (interval === 1) {
        distance = this.locales[key];
        break;
      }
    }

    distance = distance.replace(/%d/i, interval);
    words += distance + separator + this.locales.sufix;

    return words.trim();
  };

  return self;
}());

export {
  secondsToTime,
  clamp,
  shuffle,
  TimeAgo
}