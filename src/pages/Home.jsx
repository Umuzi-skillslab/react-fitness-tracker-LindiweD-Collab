import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import AudioPlayer from '../components/Media/AudioPlayer';
import { motivationTracks, exercisesData } from '../data/exercisesData';
import styles from './pages.module.css';

const FEATURES = [
  { icon: '🔍', title: 'Browse exercises', body: 'Search and filter by category, muscle group, or difficulty.' },
  { icon: '🗓️', title: 'Plan your week', body: 'Build a Monday-to-Sunday routine that fits your schedule.' },
  { icon: '📈', title: 'Track progress', body: 'Log workouts and watch your streak and volume grow.' },
];

/** Home — landing page with a hero, feature overview, and audio tracks. */
const Home = () => (
  <div>
    <section className={styles.hero}>
      <div className="container">
        <h1>Train with intention.</h1>
        <p>
          Pulse helps you plan, log, and stick to a routine — {exercisesData.length} exercises
          ready to browse, right now.
        </p>
        <div className={styles.heroActions}>
          <Link to="/exercises">
            <Button variant="primary">Browse Exercises</Button>
          </Link>
          <Link to="/workout-planner">
            <Button variant="secondary">Plan my week</Button>
          </Link>
        </div>
      </div>
    </section>

    <div className="container">
      <section className={styles.section}>
        <h2>What you can do</h2>
        <div className={styles.featureGrid}>
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <div style={{ fontSize: '1.8rem' }}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Motivation tracks</h2>
        <p>Something to move to, whatever part of the workout you're in.</p>
        <div className={styles.audioGrid}>
          {motivationTracks.map((track) => (
            <AudioPlayer
              key={track.id}
              audioUrl={track.audioUrl}
              title={track.title}
              description={track.description}
            />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Home;
