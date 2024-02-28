import styles from './TripDashboard.module.css';
import TripCard from './components/TripCard/TripCard';
import useModalStore from '../../store/Modal.store';
import CreateTripModal from '../../app/common/modals/CreateTripModal';
import useCreateTripStore, { Trip } from '../../store/CreateTrip.store';
import WeatherToday from './components/WeatherToday/WeatherToday';
import useActiveTripStore from '../../store/ActiveTrip.store';
import WeatherDaily from './components/WeatherDaily/WeatherDaily';
import { useEffect, useState } from 'react';

const TripDashboard = () => {
  const storedTrips = sessionStorage.getItem('myTrips');

  const { isModalOpen, setIsModalOpen } = useModalStore();
  const { myTrips, setMyTrips } = useCreateTripStore();
  const { activeCity, setActiveCity, setActiveTripId } = useActiveTripStore();
  const [searchInput, setSearchInput] = useState('');
  const [trips, setTrips] = useState<Trip[]>(myTrips);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    setActiveCity('');
    setActiveTripId('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
    setActiveCity('');
    setActiveTripId('');
  };

  useEffect(() => {
    const filterTrips = myTrips.filter((trip) => {
      if (!searchInput) {
        return trip;
      } else {
        return trip.city.toLowerCase().startsWith(searchInput);
      }
    });
    setTrips(filterTrips);
  }, [myTrips, searchInput]);

  useEffect(() => {
    if (storedTrips) {
      setMyTrips(JSON.parse(storedTrips));
    }
  }, []);

  return (
    <div className={styles.mainPage}>
      <div className={styles.leftSide}>
        {isModalOpen && <CreateTripModal />}
        <h1 className={styles.title}>
          Weater <strong>Forecast</strong>
        </h1>
        <div className={styles.group}>
          <i className='fa-solid fa-magnifying-glass'></i>
          <input
            type='text'
            value={searchInput}
            onChange={handleInputChange}
            placeholder='Search your trip'
            className={styles.searchInput}
          />
        </div>
        <div className={styles.list}>
          <div className={styles.horyzontalScroll}>
            {trips.length === 0 ? (
              <div className={styles.noTrip}>Trip not found</div>
            ) : (
              trips.map((trip) => (
                <TripCard
                  key={trip.tripId}
                  tripId={trip.tripId}
                  photoUrl={trip.photoUrl}
                  city={trip.city}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                />
              ))
            )}
          </div>
          <button className={styles.btnAdd} onClick={() => handleClick()}>
            <i className='fa-solid fa-plus'></i>
            <p className={styles.btnTxt}>Add trip</p>
          </button>
        </div>
        {activeCity && <WeatherDaily />}
      </div>
      {activeCity && <WeatherToday />}
    </div>
  );
};
export default TripDashboard;
