import { useEffect, useState } from 'react';
import styles from './CreateTripModal.module.css';
import { trips } from '../../api/trips';
import useModalStore from '../../../store/Modal.store';
import useCreateTripStore from '../../../store/CreateTrip.store';
import { addDays } from '../../../helpers/addDays';
import { splitISOStringDate } from '../../../helpers/splitISOStringDate';

const CreateTripModal = () => {
  const [inputTypeStartDate, setInputTypeStartDate] = useState('text');
  const [inputTypeEndDate, setInputTypeEndDate] = useState('text');
  const [minStartDate, setMinStartDate] = useState('');
  const [maxStartDate, setMaxStartDate] = useState('');
  const [minEndDate, setMinEndDate] = useState('');
  const [maxEndDate, setMaxEndDate] = useState('');

  const { isModalOpen, setIsModalOpen } = useModalStore();
  const {
    selectedCity,
    setSelectedCity,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSelectedCityImg,
    addTrip,
  } = useCreateTripStore();

  const handleToggleModal = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedCity('');
      setStartDate('');
      setEndDate('');
    }

    setIsModalOpen(isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCityImage = trips.find((item) => item.city === selectedCity);
    selectedCityImage && setSelectedCityImg(selectedCityImage?.photoUrl);
    addTrip();
    handleToggleModal(!isModalOpen);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = splitISOStringDate(today);
    setMinStartDate(formattedDate);
  }, []);

  useEffect(() => {
    if (minStartDate) {
      const maxValidStartDate = addDays(new Date(minStartDate), 15);
      const formattedDate = splitISOStringDate(maxValidStartDate);
      setMaxStartDate(formattedDate);
    }
  }, [minStartDate]);

  useEffect(() => {
    setMinEndDate(startDate || minStartDate);
  }, [startDate, maxStartDate]);

  useEffect(() => {
    if (startDate && minStartDate) {
      const maxValidEndDate = addDays(new Date(startDate), 15);
      const formattedDate = splitISOStringDate(maxValidEndDate);
      setMaxEndDate(formattedDate);
    } else {
      setMaxEndDate(maxStartDate);
    }
  }, [startDate, minStartDate, maxStartDate]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.headingWrapper}>
          <p className={styles.heading}>Create trip</p>
          <button
            className={styles.btnClose}
            onClick={() => handleToggleModal(!isModalOpen)}
          >
            <i className='fa-solid fa-x'></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <div className={styles.rowWrap}>
              <label className={styles.label}>
                <span className={styles.asterisk}>* </span>City
              </label>
              <select
                className={styles.field}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value=''>Please select a city</option>
                {trips.map((trip) => (
                  <option key={trip.id} value={trip.city}>
                    {trip.city}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rowWrap}>
              <label className={styles.label}>
                <span className={styles.asterisk}>* </span>Start date
              </label>
              <div className={styles.inputIconWrap}>
                <input
                  type={inputTypeStartDate}
                  onFocus={() => setInputTypeStartDate('date')}
                  onBlur={() => setInputTypeStartDate('text')}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.field}
                  placeholder='Select date'
                  min={minStartDate}
                  max={maxStartDate}
                  required
                />
                {(inputTypeStartDate === 'text' || startDate === '') && (
                  <i className='fa-regular fa-calendar' />
                )}
              </div>
            </div>
            <div className={styles.rowWrap}>
              <label className={styles.label}>
                <span className={styles.asterisk}>* </span>End date
              </label>
              <div className={styles.inputIconWrap}>
                <input
                  type={inputTypeEndDate}
                  onFocus={() => setInputTypeEndDate('date')}
                  onBlur={() => setInputTypeEndDate('text')}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.field}
                  placeholder='Select date'
                  min={minEndDate}
                  max={maxEndDate}
                  required
                />
                {(inputTypeEndDate === 'text' || endDate === '') && (
                  <i className='fa-regular fa-calendar' />
                )}
              </div>
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <button
              className={styles.btnCancel}
              onClick={() => handleToggleModal(!isModalOpen)}
            >
              Cancel
            </button>
            <button className={styles.btnSave}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripModal;
