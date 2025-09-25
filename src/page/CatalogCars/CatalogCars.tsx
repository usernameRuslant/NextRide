import CarCard from '../../components/CarCard/CarCard';
import css from './CatalogCars.module.css';
import CarFilters from '../../components/CarFilters/CarFilters';
import { useCarStore } from '../../store/useCarStore';
import { useEffect, useState } from 'react';

const STEP = 4;
const INITIAL_LIMIT = 12;

const CatalogCars = () => {
  const cars = useCarStore((s) => s.cars);
  const loading = useCarStore((s) => s.loading);
  const page = useCarStore((s) => s.page);
  const totalPages = useCarStore((s) => s.totalPages);
  const fetchInitialCars = useCarStore((s) => s.fetchInitialCars);
  const fetchCars = useCarStore((s) => s.fetchCars); // универсальная
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  useEffect(() => {
    fetchInitialCars();
  }, [fetchInitialCars]);

  useEffect(() => {
    setVisibleCount(INITIAL_LIMIT);
  }, [cars]);

  const handleLoadMore = async () => {
    const target = visibleCount + STEP;

    if (target <= cars.length) {
      setVisibleCount(target);
      return;
    }

    if (page < totalPages) {
      await fetchCars(page + 1);
      setVisibleCount(target);
      return;
    }

    setVisibleCount(Math.min(target, cars.length));
  };

  const canShowMore = visibleCount < cars.length || page < totalPages;

  return (
    <div className={css.catalogContainer}>
      <CarFilters />

      <ul className={css.carsList}>
        {cars.slice(0, visibleCount).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {canShowMore && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={css.buttonloadMore}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default CatalogCars;
