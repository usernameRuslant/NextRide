import { Link } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  return (
    <section className={css.hero}>
      <h1 className={css.heroTitle}>Find your perfect rental car</h1>
      <p className={css.heroInfo}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link to="/catalog" className={css.heroLink}>
        View Catalog
      </Link>
    </section>
  );
};

export default Home;
