import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';

describe('VideoPlayer', () => {
  test('renders a native <video> element for a local file URL', () => {
    render(<VideoPlayer videoUrl="/video.mp4" title="Push-ups Demo" />);
    expect(screen.getByText('Push-ups Demo')).toBeInTheDocument();
    const video = screen.getByLabelText('Push-ups Demo demonstration video');
    expect(video.tagName.toLowerCase()).toBe('video');
    expect(video).toHaveAttribute('controls');
  });

  test('renders a YouTube iframe embed when videoUrl is a YouTube link', () => {
    render(
      <VideoPlayer
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        title="Push-ups Demo"
      />
    );
    const iframe = screen.getByTitle('Push-ups Demo demonstration video');
    expect(iframe.tagName.toLowerCase()).toBe('iframe');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
  });
});

describe('AudioPlayer', () => {
  test('renders a native <audio> element for a local file URL', () => {
    render(<AudioPlayer audioUrl="/track.mp3" title="Rise & Grind" />);
    expect(screen.getByText('Rise & Grind')).toBeInTheDocument();
    const audio = screen.getByLabelText('Rise & Grind audio track');
    expect(audio.tagName.toLowerCase()).toBe('audio');
    expect(audio).toHaveAttribute('controls');
  });

  test('renders a YouTube iframe embed when audioUrl is a YouTube link', () => {
    render(<AudioPlayer audioUrl="https://youtu.be/dQw4w9WgXcQ" title="Rise & Grind" />);
    const iframe = screen.getByTitle('Rise & Grind audio track');
    expect(iframe.tagName.toLowerCase()).toBe('iframe');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
  });
});