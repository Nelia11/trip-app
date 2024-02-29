import { FC } from 'react';
import styles from './GoogleButton.module.css';
import googleIcon from './googleIcon.svg';

interface GoogleButton {
  text: string;
  handleClick: () => void;
}

const GoogleButton: FC<GoogleButton> = ({ handleClick, text }) => {
  return (
    <div className={styles.googleBtn} onClick={() => handleClick()}>
      <img src={googleIcon} alt='google-icon' />
      <span>{text}</span>
    </div>
  );
};

export default GoogleButton;
