import { FC } from 'react';
import styles from './TripCard.module.css';
import useActiveTripStore from '../../../../store/ActiveTrip.store';

interface TripCardProps {
  photoUrl: string;
  city: string;
  startDate: string;
  endDate: string;
}

const TripCard: FC<TripCardProps> = ({
  photoUrl,
  city,
  startDate,
  endDate,
}) => {
  const { activeCity, setActiveCity, setActiveStartDay, setActiveEndDay } =
    useActiveTripStore();

  const handleChange = () => {
    if (city !== activeCity) {
      setActiveCity(city);
      setActiveStartDay(startDate);
      setActiveEndDay(endDate);
    } else {
      setActiveCity('');
      setActiveStartDay('');
      setActiveEndDay('');
    }
  };

  return (
    <div className={styles.card}>
      <input
        type='checkbox'
        id={city}
        checked={city === activeCity}
        onChange={handleChange}
      />
      <label htmlFor={city} />
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
