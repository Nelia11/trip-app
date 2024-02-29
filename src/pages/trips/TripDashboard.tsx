import styles from './TripDashboard.module.css';
import TripCard from './components/TripCard/TripCard';
import useModalStore from '../../store/Modal.store';
import CreateTripModal from '../../app/common/modals/CreateTripModal/CreateTripModal';
import useCreateTripStore, { Trip } from '../../store/CreateTrip.store';
import WeatherToday from './components/WeatherToday/WeatherToday';
import useActiveTripStore from '../../store/ActiveTrip.store';
import WeatherDaily from './components/WeatherDaily/WeatherDaily';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import GoogleButton from '../../app/common/buttons/GoogleButton/GoogleButton';

interface TripDashboardProps {
  logOut: () => void;
}
const TripDashboard: FC<TripDashboardProps> = ({ logOut }) => {
  const storedTrips = sessionStorage.getItem('myTrips');

  const { isModalOpen, setIsModalOpen } = useModalStore();
  const { myTrips, setMyTrips } = useCreateTripStore();
  const { activeCity, setActiveCity, setActiveTripId } = useActiveTripStore();
  const [searchInput, setSearchInput] = useState('');
  const [trips, setTrips] = useState<Trip[]>(myTrips);

  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -100,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
    }
  };

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    setActiveCity('');
    setActiveTripId('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
    setActiveCity('');
    setActiveTripId('');
  };

  useEffect(() => {
    const filterTrips = [...myTrips].filter((trip) => {
      if (!searchInput) {
        return trip;
      } else {
        return trip.city.toLowerCase().startsWith(searchInput);
      }
    });
    setTrips(filterTrips);
  }, [myTrips, searchInput]);

  useEffect(() => {
    if (storedTrips) {
      setMyTrips(JSON.parse(storedTrips));
    }
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    let sortedTrips = [...myTrips];

    if (sortValue === 'asc') {
      sortedTrips.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    } else if (sortValue === 'desc') {
      sortedTrips.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    }

    if (sortValue === '') {
      setTrips(trips);
    } else {
      setTrips(sortedTrips);
    }
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.leftSide}>
        {isModalOpen && <CreateTripModal />}
        <GoogleButton text='Log out' handleClick={logOut} />
        <h1 className={styles.title}>
          Weater <strong>Forecast</strong>
        </h1>
        <div className={styles.filters}>
          <div className={styles.group}>
            <i className='fa-solid fa-magnifying-glass'></i>
            <input
              id='searchInput'
              type='text'
              value={searchInput}
              onChange={handleInputChange}
              placeholder='Search your trip'
              className={styles.searchInput}
            />
          </div>
          <select onChange={handleSortChange} id='sort-start-date'>
            <option value=''>Sort by date</option>
            <option value='asc'>ASC</option>
            <option value='desc'>DESC</option>
          </select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            {trips.length > 1 && (
              <button className={styles.scrollBtnLeft} onClick={scrollLeft}>
                <i className='fa-solid fa-chevron-left'></i>
              </button>
            )}
            <div className={styles.horyzontalScroll} ref={scrollRef}>
              {trips.length === 0 ? (
                <div className={styles.noTrip}>Trip not found</div>
              ) : (
                trips.map((trip) => (
                  <TripCard
                    key={trip.tripId}
                    tripId={trip.tripId}
                    photoUrl={trip.photoUrl}
                    city={trip.city}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                  />
                ))
              )}
            </div>
            {trips.length > 1 && (
              <button className={styles.scrollBtnRight} onClick={scrollRight}>
                <i className='fa-solid fa-chevron-right'></i>
              </button>
            )}
          </div>
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
