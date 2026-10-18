import assert from 'node:assert/strict';
import { toYoutubeEmbedUrl } from './youtube.ts';

assert.equal(
  toYoutubeEmbedUrl('https://www.youtube.com/watch?v=yx6UAhNmstg'),
  'https://www.youtube.com/embed/yx6UAhNmstg',
);
assert.equal(
  toYoutubeEmbedUrl('https://youtu.be/yx6UAhNmstg'),
  'https://www.youtube.com/embed/yx6UAhNmstg',
);
assert.equal(
  toYoutubeEmbedUrl('https://www.youtube.com/embed/yx6UAhNmstg'),
  'https://www.youtube.com/embed/yx6UAhNmstg',
);
assert.equal(toYoutubeEmbedUrl('not-a-url'), undefined);

console.log('youtube embed: ok');
