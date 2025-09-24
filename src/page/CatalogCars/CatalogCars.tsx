import { useEffect, useState } from 'react';
import CarCard from '../../components/CarCard/CarCard';
import type { Car } from '../../types/car';
import { fetchCars } from '../../services/carServices';
import css from './CatalogCars.module.css';

const CatalogCars = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCars(1).then((data) => setCars(data.cars));
  }, []);
  return (
    <div className={css.catalogContainer}>
      <ul className={css.carsList}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>
    </div>
  );
};

export default CatalogCars;
