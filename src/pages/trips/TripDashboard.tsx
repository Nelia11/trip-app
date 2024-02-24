import styles from './TripDashboard.module.css';

const TripDashboard = () => {
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          Weater <strong>Forecast</strong>
        </h1>
        <input />
        <div>City</div>
        <button>Add trip</button>
        <div>Weater all days preview</div>
      </div>
      <div>Weather today</div>
    </div>
  );
};
export default TripDashboard;
