import axios from 'axios';
import type { Car, FetchCarsParams } from '../types/car';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
});
interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number | string;
  totalPages: number;
}

export const fetchCarsBasic = async (page = 1, limit = 12) => {
  const { data } = await api.get<FetchCarsResponse>('/cars', {
    params: { page, limit },
  });
  return { ...data, page: Number(data.page) }; // 🔧
};

export const fetchCarsFilter = async (params: FetchCarsParams = {}) => {
  const { data } = await api.get<FetchCarsResponse>('/cars', { params });
  return { ...data, page: Number(data.page) }; // 🔧
};
export const fetchCarById = async (id: string) => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/brands');
  return data;
};
//
