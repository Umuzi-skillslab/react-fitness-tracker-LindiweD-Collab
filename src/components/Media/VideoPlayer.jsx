import PropTypes from 'prop-types';
import styles from './Media.module.css';

/**
 * VideoPlayer — embeds an exercise demonstration video with native
 * play/pause controls and fallback text for unsupported browsers.
 */
const VideoPlayer = ({ videoUrl, title, description = 'Watch the full-form demonstration before you start.' }) => (
  <div className={styles.videoContainer}>
    <h4 className={styles.mediaTitle}>{title}</h4>
    <p className={styles.mediaDesc}>{description}</p>
    <video controls preload="metadata" aria-label={`${title} demonstration video`}>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag. You can still read the
      written instructions above.
    </video>
  </div>
);

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;
