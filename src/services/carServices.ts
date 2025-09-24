import axios from 'axios';
import type { Car } from '../types/car';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
});
interface fetchCarsResponcse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
export const fetchCars = async (page = 1, limit = 12) => {
  const { data } = await api.get<fetchCarsResponcse>('/cars', {
    params: {
      page,
      limit,
    },
  });
  return data;
};
