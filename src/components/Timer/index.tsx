import React, { useEffect, useState } from "react";

import style from "./style.module.css";

type TimerProps = {
  duration: number;
  onTimeout: () => void;
};

const Timer = ({ duration, onTimeout }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    if (remainingTime < 0) {
      onTimeout();
    } else {
      const timerId = setInterval(() => {
        setRemainingTime((prevTime: number) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [remainingTime]);

  return (
    <div className={style.timerContainer}>
      <div>
        {remainingTime.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </div>
      <p>sec</p>
    </div>
  );
};

export default Timer;
