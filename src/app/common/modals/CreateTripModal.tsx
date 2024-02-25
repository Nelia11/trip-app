import { useState } from 'react';
import styles from './CreateTripModal.module.css';

const CreateTripModal = () => {
  const [inputTypeStartDate, setInputTypeStartDate] = useState('text');
  const [inputTypeEndDate, setInputTypeEndDate] = useState('text');

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Create trip</p>
      <form>
        <div className={styles.wrapper}>
          <div className={styles.rowWrap}>
            <label className={styles.label}>
              <span className={styles.asterisk}>* </span>City
            </label>
            <select className={styles.field} required>
              <option value='' disabled selected>
                Please select a city
              </option>
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
                className={styles.field}
                placeholder='Select date'
                required
              />
              <i className='fa-regular fa-calendar' />
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
                className={styles.field}
                placeholder='Select date'
                required
              />
              <i className='fa-regular fa-calendar' />
            </div>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.btnCancel}>Cancel</button>
          <button className={styles.btnSave}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTripModal;
