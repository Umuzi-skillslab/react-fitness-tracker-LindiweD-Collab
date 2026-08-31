import { isYouTubeUrl, getYouTubeEmbedUrl } from './youtube';

describe('youtube helpers', () => {
  test('isYouTubeUrl recognizes youtube.com and youtu.be links', () => {
    expect(isYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isYouTubeUrl('/assets/videos/pushups.mp4')).toBe(false);
    expect(isYouTubeUrl('')).toBe(false);
  });

  test('getYouTubeEmbedUrl converts a watch URL', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  test('getYouTubeEmbedUrl converts a youtu.be short URL', () => {
    expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  test('getYouTubeEmbedUrl converts a watch URL with extra query params', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  test('getYouTubeEmbedUrl returns null for a non-YouTube URL', () => {
    expect(getYouTubeEmbedUrl('/assets/videos/pushups.mp4')).toBeNull();
  });
});