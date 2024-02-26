import styles from './TripDashboard.module.css';
import { trips } from '../../app/api/trips';
import TripCard from './components/TripCard/TripCard';
import useModalStore from '../../store/Modal.store';
import CreateTripModal from '../../app/common/modals/CreateTripModal';
import useCreateTripStore from '../../store/CreateTrip.store';
import { v4 as uuidv4 } from 'uuid';

const TripDashboard = () => {
  const { isModalOpen, setIsModalOpen } = useModalStore();
  const { myTrips } = useCreateTripStore();
  
  return (
    <div>
      {isModalOpen && <CreateTripModal />}
      <div>
        <h1 className={styles.title}>
          Weater <strong>Forecast</strong>
        </h1>
        <input />
        <div className={styles.list}>
          <TripCard
            photoUrl={trips[0].photoUrl}
            city={trips[0].city}
            startDate='01.03.2024'
            endDate='07.03.2024'
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
          <button
            className={styles.btnAdd}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <i className='fa-solid fa-plus'></i>
            <p className={styles.btnTxt}>Add trip</p>
          </button>
        </div>
        <div>Weater all days preview</div>
      </div>
      <div>Weather today</div>
    </div>
  );
};
export default TripDashboard;
