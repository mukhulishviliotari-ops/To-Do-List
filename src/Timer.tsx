import { useState, useEffect } from 'react';

function Timer() {
  const [timeRemaining, setTimeRemaining] = useState<number>(300);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeRemaining]); 

  const formatTime = (totalSeconds: number): string => {
    if (totalSeconds <= 0) return "00:00";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedMin = String(minutes).padStart(2, '0');
    const paddedSec = String(seconds).padStart(2, '0');

    if (hours > 0) {
      const paddedHours = String(hours).padStart(2, '0');
      return `${paddedHours}:${paddedMin}:${paddedSec}`;
    }

    return `${paddedMin}:${paddedSec}`;
  };

  const toggleTimer = () => {
    if (timeRemaining <= 0) {
      resetTimer(300);
    } else {
      setIsActive(!isActive);
    }
  };
  
  const resetTimer = (seconds: number = 300) => {
    setIsActive(false);
    setTimeRemaining(seconds);
  };

  return (
    <div className="TimerCard">
      <h2 className="CardTitle">Focus Timer</h2>
      <h1 id="timer" className={timeRemaining <= 0 ? "timeUp" : ""}>
        {formatTime(timeRemaining)}
      </h1>
      
      <div className="TimerControls">
        <button className="newTask" onClick={toggleTimer}>
          {timeRemaining <= 0 ? "Reset" : isActive ? "Pause" : "Start"}
        </button>

        <button className="deleteBtn" onClick={() => resetTimer(300)}>
          Reset to 5m
        </button>
      </div>
    </div>
  );
}

export default Timer;


