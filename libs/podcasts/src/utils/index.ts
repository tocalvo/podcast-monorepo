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
  const hours = ms / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return `${h}:${m}:${s.toString().padStart(2, '0')}`;
}
