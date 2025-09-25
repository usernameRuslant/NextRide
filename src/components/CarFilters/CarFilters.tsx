import BrandFilter from '../BrandFilter/BrandFilter';
import css from './CarFilters.module.css';
import { useCarStore } from '../../store/useCarStore';
import PriceFilter from '../PriceFilter/PriceFilter';
import MileageFilter from '../MileageFilter/MileageFilter';

const CarFilters = () => {
  const brand = useCarStore((state) => state.brand);
  const setBrand = useCarStore((state) => state.setBrand);

  const rentalPrice = useCarStore((state) => state.rentalPrice);
  const setRentalPrice = useCarStore((state) => state.setRentalPrice);

  const mileageFrom = useCarStore((state) => state.mileageFrom);
  const mileageTo = useCarStore((state) => state.mileageTo);
  const setMileageFrom = useCarStore((state) => state.setMileageFrom);
  const setMileageTo = useCarStore((state) => state.setMileageTo);

  const fetchFilteredCars = useCarStore((state) => state.fetchFilteredCars);

  const handleSearch = () => {
    fetchFilteredCars();
  };

  return (
    <div className={css.filterWraper}>
      <BrandFilter selected={brand} onChange={setBrand} />
      <PriceFilter selected={rentalPrice} onChange={setRentalPrice} />
      <MileageFilter
        from={mileageFrom}
        to={mileageTo}
        onChangeFrom={setMileageFrom}
        onChangeTo={setMileageTo}
      />
      <button
        className={css.buttonSearch}
        onClick={handleSearch}
        disabled={!brand && !rentalPrice && !mileageFrom && !mileageTo}
      >
        Search
      </button>
    </div>
  );
};

export default CarFilters;
