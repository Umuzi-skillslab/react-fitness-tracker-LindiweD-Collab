
const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([^&]+)/,
  /(?:youtu\.be\/)([^?&]+)/,
  /(?:youtube\.com\/embed\/)([^?&]+)/,
  /(?:youtube\.com\/shorts\/)([^?&]+)/,
];

export function isYouTubeUrl(url) {
  return Boolean(url) && /(?:youtube\.com|youtu\.be)/.test(url);
}

export function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return null;
}