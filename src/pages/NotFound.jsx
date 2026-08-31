import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './pages.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={`container ${styles.notFound}`}>
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFound;
