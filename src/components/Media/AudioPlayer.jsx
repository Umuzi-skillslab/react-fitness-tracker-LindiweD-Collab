import PropTypes from 'prop-types';
import styles from './Media.module.css';

/**
 * AudioPlayer — plays a motivational audio track with native play/pause
 * controls and fallback text for unsupported browsers.
 */
const AudioPlayer = ({ audioUrl, title, description = '' }) => (
  <div className={styles.audioContainer}>
    <h4 className={styles.mediaTitle}>{title}</h4>
    <p className={styles.mediaDesc}>{description}</p>
    <audio controls preload="none" aria-label={`${title} audio track`}>
      <source src={audioUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default AudioPlayer;
