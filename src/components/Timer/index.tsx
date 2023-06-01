import React, { useEffect, useState } from "react";

type TimerProps = {
  duration: number;
  onTimeout: () => void;
};

const Timer = ({ duration, onTimeout }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout();
    } else {
      const timerId = setInterval(() => {
        setRemainingTime((prevTime: number) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [remainingTime, onTimeout]);

  return (
    <div className="timer-container">
      <div className="timer-digits">
        {remainingTime.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </div>
    </div>
  );
};

export default Timer;
