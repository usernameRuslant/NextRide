import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={css.button}>
        Go Home
      </Link>
    </div>
  );
}
