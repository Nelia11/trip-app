import { FC } from 'react';
import styles from './TripCard.module.css';

interface TripCardProps {
  photoUrl: string;
  city: string;
  dates: string;
}

const TripCard: FC<TripCardProps> = ({ photoUrl, city, dates }) => {
  return (
    <div className={styles.card}>
      <img className={styles.photo} src={photoUrl} alt='city-image' />
      <div className={styles.info}>
        <p className={styles.city}>{city}</p>
        <p className={styles.dates}>{dates}</p>
      </div>
    </div>
  );
};
export default TripCard;
