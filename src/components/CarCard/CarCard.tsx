import type { Car } from '../../types/car';
import css from './CarCard.module.css';

interface CarProps {
  car: Car;
}

const CarCard = ({ car }: CarProps) => {
  return (
    <li className={css.card}>
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={css.image}
        loading="lazy"
      />
      <div className={css.carInfo}>
        <p className={css.carInfoTitle}>
          {car.brand} <span>{car.model}</span>, {car.year}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      {/* <div className={css.carMoreInfo}>
        <div className={css.carLocation}>
          <p>{car.address.split(',').slice(1).join(' |')} |</p>
          <p>{car.rentalCompany} |</p>
        </div>
        <div className={css.carType}>
          <p>{car.type} |</p>
          <p>{car.mileage} km</p>
        </div>
      </div> */}
      <ul className={css.carMoreInfoListTop}>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>
            {car.address.split(',').slice(1, 2).join('').trim()}
          </p>
        </li>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>
            {car.address.split(',').slice(2, 3).join('').trim()}
          </p>
        </li>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>{car.rentalCompany} </p>
        </li>
      </ul>
      <ul className={css.carMoreInfoListBottom}>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>{car.type} </p>
        </li>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>{car.mileage} km</p>
        </li>
      </ul>
    </li>
  );
};

export default CarCard;
