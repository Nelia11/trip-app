import { useMemo } from 'react';
import { baseURL } from '../../../../constants/baseURL';
import getImageUrl from '../../../../helpers/image-util';
import useFetch from '../../../../hooks/useFetch';
import useActiveTripStore from '../../../../store/ActiveTrip.store';
import styles from './WeatherDaily.module.css';
import { weekDays } from '../../../../constants/weekDays';
import { getDay } from '../../../../helpers/getDay';

const WeatherDaily = () => {
  const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
  const { activeCity, activeStartDate, activeEndDate } = useActiveTripStore();
  const { data, isLoading, error } = useFetch(
    `${baseURL}/${activeCity}/${activeStartDate}/${activeEndDate}?unitGroup=metric&include=days&key=${apiKey}&iconSet=icons2&contentType=json`
  );

  const weekdays = useMemo(() => weekDays, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {data.days.length === 7
          ? 'Week'
          : data.days.length === 14
          ? '2 weeks'
          : data.days.length === 1
          ? '1 day'
          : `${data.days.length} days`}
      </div>
      <div className={styles.weatherForecast}>
        {data?.days.map((day, index) => (
          <div className={styles.weatherDay} key={index}>
            <div className={styles.day}>{getDay(day.datetime, weekdays)}</div>
            <img src={getImageUrl(day.icon)} />
            <div className={styles.maxMinTemp}>
              <div className={styles.temp}>
                {Math.round(day.tempmax)}
                <span className={styles.degree}>&deg;</span>
              </div>
              /
              <div className={styles.temp}>
                {Math.round(day.tempmin)}
                <span className={styles.degree}>&deg;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WeatherDaily;
