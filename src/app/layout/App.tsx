import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TripDashboard from '../../pages/trips/TripDashboard';
import styles from './App.module.css';
import GoogleButton from '../common/buttons/GoogleButton/GoogleButton';
import useCreateTripStore from '../../store/CreateTrip.store';

interface User {
  access_token: string;
}

interface Profile {
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { setMyTrips, myTrips } = useCreateTripStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setUser({ access_token: storedToken });
    }
  }, []);

  const login: any = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem('access_token', codeResponse.access_token);
    },

    onError: (error) => console.log('Login Failed:', error),
  });

  const handleLogin = async () => {
    try {
      if (user) {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        );
        setProfile(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [user]);

  const logOut = () => {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('myTrips');
    setMyTrips([myTrips[0]]);
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  return (
    <>
      {profile ? (
        <>
          <TripDashboard logOut={logOut} />
        </>
      ) : (
        <div className={styles.loginWrap}>
          <GoogleButton text='Log in with Google' handleClick={login} />
        </div>
      )}
    </>
  );
}
export default App;
