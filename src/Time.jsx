// Time.js
import { useEffect, useState } from 'react';

function Time({ timezone }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (timezone === undefined) return;

    const updateTime = () => {
      const nowUTC = new Date();
const utcTime = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
const localTime = new Date(utcTime + timezone * 1000);
      setTime(localTime.toLocaleTimeString());
    };

    updateTime();
  const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return <p><strong>Local Time:</strong> {time || 'Loading...'}</p>;
}

export default Time;
