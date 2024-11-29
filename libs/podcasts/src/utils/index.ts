import { ITunesPodcastEntry } from '../models';

export function getImageFromEntry(entry: ITunesPodcastEntry) {
  return entry['im:image']?.length
    ? entry['im:image'][0]
    : {
        label:
          'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
        attributes: { height: '50' },
      };
}

export function formatMillisecondsToMinSec(ms: number) {
  //Get hours from milliseconds
  var hours = ms / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return `${h}:${m}:${s.toString().padStart(2, '0')}`;
}
