import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import type { Car } from '../../types/car';
import css from './CarCard.module.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface CarProps {
  car: Car;
}

const CarCard = ({ car }: CarProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Проверяем избранное при загрузке компонента
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(car.id)) {
      setIsFavorite(true);
    }
  }, [car.id]);

  // Добавление/удаление авто в избранное
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(car.id)) {
      favorites = favorites.filter((id: string) => id !== car.id);
      setIsFavorite(false);
    } else {
      favorites.push(car.id);
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <li className={css.card}>
      <button type="button" className={css.heartBtn} onClick={toggleFavorite}>
        {isFavorite ? (
          <BsHeartFill size={16} color="#3470ff" />
        ) : (
          <BsHeart size={16} color="#f2f4f7" />
        )}
      </button>

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
          <p className={css.carMoreInfoText}>{car.rentalCompany}</p>
        </li>
      </ul>

      <ul className={css.carMoreInfoListBottom}>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>{car.type}</p>
        </li>
        <li className={css.carMoreInfoItem}>
          <p className={css.carMoreInfoText}>
            {car.mileage.toLocaleString('uk-UA')} km
          </p>
        </li>
      </ul>

      <Link to={`/catalog/${car.id}`} className={css.cardMoreInfo}>
        Read more
      </Link>
    </li>
  );
};

export default CarCard;
