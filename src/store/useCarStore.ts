import { create } from 'zustand';
import type { Car } from '../types/car';
import { fetchCarsBasic, fetchCarsFilter } from '../services/carServices';

interface CarState {
  cars: Car[];
  allCars: Car[];
  brand: string;
  rentalPrice: number | null;
  mileageFrom: number | null;
  mileageTo: number | null;
  page: number;
  totalPages: number;
  loading: boolean;

  setBrand: (brand: string) => void;
  setRentalPrice: (price: number | null) => void;
  setMileageFrom: (value: number | null) => void;
  setMileageTo: (value: number | null) => void;

  fetchCars: (page?: number) => Promise<void>;
  fetchInitialCars: () => Promise<void>;
  fetchFilteredCars: () => Promise<void>;
  loadMore: () => void;
}

export const useCarStore = create<CarState>()((set, get) => ({
  cars: [],
  allCars: [],
  brand: '',
  rentalPrice: null,
  mileageFrom: null,
  mileageTo: null,
  page: 1,
  totalPages: 1,
  loading: false,

  setBrand: (brand) => set({ brand }),
  setRentalPrice: (price) => set({ rentalPrice: price }),
  setMileageFrom: (value) => set({ mileageFrom: value }),
  setMileageTo: (value) => set({ mileageTo: value }),

  fetchCars: async (page = 1) => {
    set({ loading: true });
    try {
      const data = await fetchCarsBasic(page, 12);
      set((state) => ({
        cars: page === 1 ? data.cars : [...state.cars, ...data.cars],
        allCars: [],
        page: data.page,
        totalPages: data.totalPages,
      }));
    } finally {
      set({ loading: false });
    }
  },

  fetchInitialCars: async () => {
    set({ loading: true });
    try {
      const data = await fetchCarsBasic(1, 12);
      set({
        cars: data.cars,
        allCars: [],
        page: data.page,
        totalPages: data.totalPages,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchFilteredCars: async () => {
    const { brand, rentalPrice, mileageFrom, mileageTo } = get();
    set({ loading: true, cars: [], allCars: [], page: 1, totalPages: 1 });
    try {
      const data = await fetchCarsFilter({
        brand: brand || undefined,
        page: 1,
        limit: 1000,
      });

      let filtered = data.cars;

      if (rentalPrice !== null) {
        filtered = filtered.filter(
          (c) => Number(c.rentalPrice) === rentalPrice
        );
      }

      if (mileageFrom !== null) {
        filtered = filtered.filter((c) => c.mileage >= mileageFrom);
      }
      if (mileageTo !== null) {
        filtered = filtered.filter((c) => c.mileage <= mileageTo);
      }

      const totalPages = Math.ceil(filtered.length / 12);

      set({
        allCars: filtered,
        cars: filtered.slice(0, 12),
        page: 1,
        totalPages,
      });
    } finally {
      set({ loading: false });
    }
  },

  loadMore: () => {
    const { page, totalPages, allCars, fetchCars } = get();

    if (allCars.length > 0) {
      if (page < totalPages) {
        const nextPage = page + 1;
        set({
          cars: allCars.slice(0, nextPage * 12),
          page: nextPage,
        });
      }
      return;
    }

    if (page < totalPages) {
      fetchCars(page + 1);
    }
  },
}));
