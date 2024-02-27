import { create } from 'zustand';

interface ActiveTripState {
  activeCity: string;
  setActiveCity: (city: string) => void;
  activeStartDate: string;
  setActiveStartDay: (city: string) => void;
  activeEndDate: string;
  setActiveEndDay: (city: string) => void;

}

const useActiveTripStore = create<ActiveTripState>((set) => ({
  activeCity: '',
  setActiveCity: (city) => set({ activeCity: city }),
  activeStartDate: '',
  setActiveStartDay: (date) => set({ activeStartDate: date }),
  activeEndDate: '',
  setActiveEndDay: (date) => set({ activeEndDate: date }),
}));

export default useActiveTripStore;
