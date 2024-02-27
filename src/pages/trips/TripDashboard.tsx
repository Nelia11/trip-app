import styles from './TripDashboard.module.css';
import TripCard from './components/TripCard/TripCard';
import useModalStore from '../../store/Modal.store';
import CreateTripModal from '../../app/common/modals/CreateTripModal';
import useCreateTripStore from '../../store/CreateTrip.store';
import { v4 as uuidv4 } from 'uuid';
import WeatherToday from './components/WeatherToday/WeatherToday';
import useActiveTripStore from '../../store/ActiveTrip.store';
import WeatherDaily from './components/WeatherDaily/WeatherDaily';
import { useState } from 'react';

const TripDashboard = () => {
  const { isModalOpen, setIsModalOpen } = useModalStore();
  const { myTrips } = useCreateTripStore();
  const { activeCity, setActiveCity } = useActiveTripStore();
  const [searchInput, setSeachInput] = useState('');

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    setActiveCity('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setSeachInput(lowerCase);
  };

  const filteredTrips = myTrips.filter((trip) => {
    if (!searchInput) {
      return trip;
    } else {
      return trip.city.toLowerCase().includes(searchInput);
    }
  });

  return (
    <div className={styles.mainPage}>
      <div>
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
          {filteredTrips.length === 0 ? (
            <div className={styles.noTrip}>Trip not found</div>
          ) : (
            filteredTrips.map((trip) => (
              <TripCard
                key={uuidv4()}
                photoUrl={trip.photoUrl}
                city={trip.city}
                startDate={trip.startDate}
                endDate={trip.endDate}
              />
            ))
          )}
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
