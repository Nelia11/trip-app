import { useEffect, useMemo, useState } from 'react';
import getImageUrl from '../../../../helpers/image-util';
import useActiveTripStore from '../../../../store/ActiveTrip.store';
import styles from './WeatherToday.module.css';
import calculateTimeLeft from '../../../../helpers/calculateTimeLeft';
import useFetch from '../../../../hooks/useFetch';
import { baseURL } from '../../../../constants/baseURL';
import { weekDays } from '../../../../constants/weekDays';
import { getDay } from '../../../../helpers/getDay';

const WeatherToday = () => {
  const { activeCity, activeStartDate } = useActiveTripStore();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(activeStartDate));

  const { data, isLoading, error } = useFetch(
    `${baseURL}/${activeCity}/today?unitGroup=metric&include=days&key=U8AGVEUT25KSVKCPGRGZYBYHT&iconSet=icons2&contentType=json`
  );

  const weekdays = useMemo(() => weekDays, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(activeStartDate));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [activeStartDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.weatherToday}>
      <div className={styles.wrapper}>
        <div className={styles.forecast}>
          <img
            src={getImageUrl(data?.days[0]?.icon)}
            className={styles.icon}
            alt='weather-icon'
          />
          <div className={styles.info}>
            <p>{getDay(data?.days[0]?.datetime, weekdays)}</p>
            <div className={styles.temp}>
              {Math.round(data?.days[0]?.temp)}
              <div className={styles.celsius}>
                &deg;<span>C</span>
              </div>
            </div>
            <p className={styles.city}>{activeCity}</p>
          </div>
        </div>
      </div>
      <div className={styles.counter}>
        <div className={styles.fieldWrap}>
          <p>{days ?? 0}</p>
          <p>{days === 1 ? 'DAY' : 'DAYS'}</p>
        </div>
        <div className={styles.fieldWrap}>
          <p>{hours ?? 0}</p>
          <p>{hours === 1 ? 'HOUR' : 'HOURS'}</p>
        </div>
        <div className={styles.fieldWrap}>
          <p>{minutes ?? 0}</p>
          <p>{minutes === 1 ? 'MINUTE' : 'MINUTES'}</p>
        </div>
        <div className={styles.fieldWrap}>
          <p>{seconds ?? 0}</p>
          <p>{seconds === 1 ? 'SECOND' : 'SECONDS'}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherToday;
