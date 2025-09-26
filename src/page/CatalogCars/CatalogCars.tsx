import CarCard from '../../components/CarCard/CarCard';
import css from './CatalogCars.module.css';
import CarFilters from '../../components/CarFilters/CarFilters';
import { useCarStore } from '../../store/useCarStore';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const STEP = 4;
const INITIAL_LIMIT = 12;

const CatalogCars = () => {
  const cars = useCarStore((s) => s.cars);
  const loading = useCarStore((s) => s.loading);
  const page = useCarStore((s) => s.page);
  const totalPages = useCarStore((s) => s.totalPages);
  const fetchInitialCars = useCarStore((s) => s.fetchInitialCars);
  const fetchCars = useCarStore((s) => s.fetchCars);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  useEffect(() => {
    const loadCars = async () => {
      try {
        await fetchInitialCars();
      } catch (error) {
        console.error('Error fetching initial cars:', error);
        iziToast.error({
          title: 'Error',
          message: 'Failed to load cars. Please try again later.',
          position: 'topRight',
        });
      }
    };

    loadCars();
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
      try {
        await fetchCars(page + 1);
        setVisibleCount(target);
      } catch (error) {
        console.error('Error fetching more cars:', error);
        iziToast.error({
          title: 'Error',
          message: 'Failed to load more cars. Please try again later.',
          position: 'topRight',
        });
      }
      return;
    }

    setVisibleCount(Math.min(target, cars.length));
  };

  const canShowMore = visibleCount < cars.length || page < totalPages;

  return (
    <div className={css.catalogContainer}>
      <CarFilters />

      {loading && cars.length === 0 ? (
        <Loader />
      ) : (
        <ul className={css.carsList}>
          {cars.slice(0, visibleCount).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}

      {canShowMore && !loading && (
        <button onClick={handleLoadMore} className={css.buttonloadMore}>
          Load More
        </button>
      )}

      {canShowMore && loading && cars.length > 0 && <Loader />}
    </div>
  );
};

export default CatalogCars;
