import { FC } from 'react';
import styles from './TripCard.module.css';
import useActiveTripStore from '../../../../store/ActiveTrip.store';

interface TripCardProps {
  photoUrl: string;
  city: string;
  startDate: string;
  endDate: string;
  tripId: string;
}

const TripCard: FC<TripCardProps> = ({
  photoUrl,
  city,
  startDate,
  endDate,
  tripId,
}) => {
  const {
    activeTripId,
    setActiveTripId,
    setActiveCity,
    setActiveStartDay,
    setActiveEndDay,
  } = useActiveTripStore();

  const handleChange = () => {
    if (tripId !== activeTripId) {
      setActiveTripId(tripId);
      setActiveCity(city);
      setActiveStartDay(startDate);
      setActiveEndDay(endDate);
    } else {
      setActiveTripId('');
      setActiveCity('');
      setActiveStartDay('');
      setActiveEndDay('');
    }
  };

  return (
    <div className={styles.card}>
      <input
        type='checkbox'
        id={tripId}
        checked={tripId === activeTripId}
        onChange={handleChange}
      />
      <label htmlFor={tripId} />
      <img className={styles.photo} src={photoUrl} alt='city-image' />
      <div className={styles.info}>
        <p className={styles.city}>{city}</p>
        <p className={styles.dates}>
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
};
export default TripCard;
