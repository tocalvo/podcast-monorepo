import { formatMillisecondsToMinSec } from '.';

describe('Utils', () => {
  it('formatMillisecondsToMinSec should parse correctly this ms to h:m:s ', () => {
    const result = formatMillisecondsToMinSec(3600000);
    expect(result).toBe('01:00:00');
  });
});
