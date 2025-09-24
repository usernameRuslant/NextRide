import css from './CarDetails.module.css';
import { useEffect, useState } from 'react';
import type { Car } from '../../types/car';
import { fetchCarById } from '../../services/carServices';
import { useParams } from 'react-router-dom';
import {
  BsCalendar2Week,
  BsCarFront,
  BsFuelPump,
  BsGeoAlt,
} from 'react-icons/bs';
import { GoGear } from 'react-icons/go';
import { FaRegCircleCheck } from 'react-icons/fa6';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCarById(id).then((data) => {
        setCar(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <section className={css.carDetails}>
      <div className={css.carDetailsLeft}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={css.image}
          loading="lazy"
        />
        <form action="" className={css.form}></form>
      </div>
      <div className={css.carDetailsRight}>
        <div>
          <div>
            <h2 className={css.carInfo}>
              {car.brand} {car.model}, {car.year}
            </h2>
            <p className={css.carInfoId}>id: {car.id}</p>
          </div>
          <div className={css.carInfoLocation}>
            <BsGeoAlt />
            <p className={css.carInfoLocationAddress}>
              {car.address.split(',').slice(1).join(',').trim()}
            </p>
            <p className={css.carInfoLocationMile}>Mileage: {car.mileage} km</p>
          </div>
        </div>
        <p className={css.carInfoPrice}>${car.rentalPrice}</p>
        <p className={css.carInfoDescripion}>{car.description}</p>
        <h3 className={css.carInfoTitle}>Rental Conditions: </h3>
        <ul className={css.carInfoRent}>
          {car.rentalConditions.map((item) => (
            <li key={item} className={css.carInfoRentItem}>
              <FaRegCircleCheck />
              <p>{item}</p>
            </li>
          ))}
        </ul>
        <h3 className={css.carInfoTitle}>Car Specifications:</h3>
        <ul className={css.carInfoRent}>
          <li className={css.carInfoRentItem}>
            <BsCalendar2Week />
            <p>Year: {car.year}</p>
          </li>
          <li className={css.carInfoRentItem}>
            <BsCarFront />
            <p>Type:{car.type}</p>
          </li>
          <li className={css.carInfoRentItem}>
            <BsFuelPump />
            <p>Fuel Consumption:{car.fuelConsumption}</p>
          </li>
          <li className={css.carInfoRentItem}>
            <GoGear />
            <p>Engine Size: {car.engineSize}</p>
          </li>
        </ul>
        <h3 className={css.carInfoTitle}>Accessories and functionalities:</h3>
        <ul className={css.carInfoFA}>
          {car.accessories.map((item) => (
            <li key={item} className={css.carInfoRentItem}>
              <FaRegCircleCheck />
              <p>{item}</p>
            </li>
          ))}
          {car.functionalities.map((item) => (
            <li key={item} className={css.carInfoRentItem}>
              <FaRegCircleCheck />
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CarDetails;
