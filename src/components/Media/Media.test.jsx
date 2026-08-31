import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';

describe('VideoPlayer', () => {
  test('renders a video element with controls and the given title', () => {
    render(<VideoPlayer videoUrl="/video.mp4" title="Push-ups Demo" />);
    expect(screen.getByText('Push-ups Demo')).toBeInTheDocument();
    const video = screen.getByLabelText('Push-ups Demo demonstration video');
    expect(video.tagName.toLowerCase()).toBe('video');
    expect(video).toHaveAttribute('controls');
  });
});

describe('AudioPlayer', () => {
  test('renders an audio element with controls and the given title', () => {
    render(<AudioPlayer audioUrl="/track.mp3" title="Rise & Grind" />);
    expect(screen.getByText('Rise & Grind')).toBeInTheDocument();
    const audio = screen.getByLabelText('Rise & Grind audio track');
    expect(audio.tagName.toLowerCase()).toBe('audio');
    expect(audio).toHaveAttribute('controls');
  });
});
