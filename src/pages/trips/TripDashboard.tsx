import styles from './TripDashboard.module.css';
import { trips } from '../../app/api/trips';
import TripCard from './components/TripCard/TripCard';
import useModalStore from '../../store/Modal.store';
import CreateTripModal from '../../app/common/modals/CreateTripModal';
import useCreateTripStore from '../../store/CreateTrip.store';
import { v4 as uuidv4 } from 'uuid';
import WeatherToday from './components/WeatherToday/WeatherToday';
import useActiveTripStore from '../../store/ActiveTrip.store';
import WeatherDaily from './components/WeatherDaily/WeatherDaily';

const TripDashboard = () => {
  const { isModalOpen, setIsModalOpen } = useModalStore();
  const { myTrips } = useCreateTripStore();
  const { activeCity, setActiveCity } = useActiveTripStore();

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    setActiveCity('');
  };

  return (
    <div className={styles.mainPage}>
      <div>
        {isModalOpen && <CreateTripModal />}
        <h1 className={styles.title}>
          Weater <strong>Forecast</strong>
        </h1>
        <input />
        <div className={styles.list}>
          <TripCard
            photoUrl={trips[0].photoUrl}
            city={trips[0].city}
            startDate='03.01.2024'
            endDate='03.07.2024'
          />
          {myTrips.map((trip) => (
            <TripCard
              key={uuidv4()}
              photoUrl={trip.photoUrl}
              city={trip.city}
              startDate={trip.startDate}
              endDate={trip.endDate}
            />
          ))}
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
