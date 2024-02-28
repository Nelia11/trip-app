import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface CreateTripState {
  myTrips: {
    tripId: string;
    city: string;
    startDate: string;
    endDate: string;
    photoUrl: string;
  }[];
  tripId: string;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedCityImg: string;
  setSelectedCityImg: (url: string) => void;
  addTrip: () => void;
}

const useCreateTripStore = create<CreateTripState>((set) => ({
  myTrips: [
    {
      tripId: uuidv4(),
      city: 'Copenhagen',
      photoUrl: 'https://trips-app.s3.eu-north-1.amazonaws.com/copenhagen.jpg',
      startDate: '2024-03-01',
      endDate: '2024-03-07',
    },
  ],
  tripId: '',
  selectedCity: '',
  setSelectedCity: (city) => set({ selectedCity: city }),
  startDate: '',
  setStartDate: (date) => set({ startDate: date }),
  endDate: '',
  setEndDate: (date) => set({ endDate: date }),
  selectedCityImg: '',
  setSelectedCityImg: (url) => set({ selectedCityImg: url }),
  addTrip: () =>
    set((state) => ({
      myTrips: [
        ...state.myTrips,
        {
          tripId: uuidv4(),
          city: state.selectedCity,
          startDate: state.startDate,
          endDate: state.endDate,
          photoUrl: state.selectedCityImg,
        },
      ],
    })),
}));

export default useCreateTripStore;
