import PropTypes from 'prop-types';
import { isYouTubeUrl, getYouTubeEmbedUrl } from '../../utils/youtube';
import styles from './Media.module.css';

/**
 * AudioPlayer — plays a motivational track. If `audioUrl` is a YouTube
 * link, it renders a YouTube iframe player (YouTube has no audio-only
 * embed, so this shows their standard video player, which is perfectly
 * fine for music). Otherwise it falls back to a native HTML5 <audio>
 * element (for locally-hosted .mp3 files), with fallback text for
 * unsupported browsers.
 */
const AudioPlayer = ({ audioUrl, title, description = '' }) => {
  const embedUrl = isYouTubeUrl(audioUrl) ? getYouTubeEmbedUrl(audioUrl) : null;

  return (
    <div className={styles.audioContainer}>
      <h4 className={styles.mediaTitle}>{title}</h4>
      <p className={styles.mediaDesc}>{description}</p>

      {embedUrl ? (
        <div className={styles.youtubeWrapper}>
          <iframe
            className={styles.youtubeIframe}
            src={embedUrl}
            title={`${title} audio track`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <audio controls preload="none" aria-label={`${title} audio track`}>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default AudioPlayer;