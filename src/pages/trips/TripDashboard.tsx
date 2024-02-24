import styles from './TripDashboard.module.css';
import { trips } from '../../app/api/trips';
import TripCard from './components/TripCard/TripCard';

const TripDashboard = () => {
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          Weater <strong>Forecast</strong>
        </h1>
        <input />
        <div className={styles.list}>
          <TripCard
            photoUrl={trips[0].photoUrl}
            city={trips[0].city}
            dates='23.02.2024 - 21.07.2023'
          />
        </div>
        <button>Add trip</button>
        <div>Weater all days preview</div>
      </div>
      <div>Weather today</div>
    </div>
  );
};
export default TripDashboard;
