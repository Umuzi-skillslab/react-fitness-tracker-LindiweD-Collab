import PropTypes from 'prop-types';
import { isYouTubeUrl, getYouTubeEmbedUrl } from '../../utils/youtube';
import styles from './Media.module.css';


const VideoPlayer = ({ videoUrl, title, description = 'Watch the full-form demonstration before you start.' }) => {
  const embedUrl = isYouTubeUrl(videoUrl) ? getYouTubeEmbedUrl(videoUrl) : null;

  return (
    <div className={styles.videoContainer}>
      <h4 className={styles.mediaTitle}>{title}</h4>
      <p className={styles.mediaDesc}>{description}</p>

      {embedUrl ? (
        <div className={styles.youtubeWrapper}>
          <iframe
            className={styles.youtubeIframe}
            src={embedUrl}
            title={`${title} demonstration video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <video controls preload="metadata" aria-label={`${title} demonstration video`}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag. You can still read the
          written instructions above.
        </video>
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;
