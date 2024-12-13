import "./Timer.scss";
import { useEffect, useState } from "react";
import pause from "../../assets/icons/Pause.svg";
import restart from "../../assets/icons/Restart.svg";
import skip from "../../assets/icons/Skip.svg";
import play from "../../assets/icons/Play.svg";

export default function Timer() {
    const [totalTime, setTotalTime] = useState(45);
    const radius = 92;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(circumference);
    const [active, setActive] = useState(false);

    function formatTime(totalTime) {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    useEffect(() => {
        if (active === true) {
            const timer = setInterval(() => {
                setTotalTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    const updatedTime = prevTime - 1;
                    setProgress((updatedTime / 45) * circumference);
                    return updatedTime;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [circumference, active, totalTime]);

    const handlePlay = () => setActive((prev) => !prev);
    const handleRestart = () => {
        setTotalTime(45);
        setProgress(45 * circumference);
    }
    return (
        <>
            <section className="base-timer">
                <section className="base-timer__circle">
                    <span id="base-timer-label" className="base-timer__label">
                        {formatTime(totalTime)}
                    </span>
                    <svg className="base-timer__svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <circle className="base-timer__path-elapsed" cx="50%" cy="50%" r={radius}></circle>
                        <circle className="base-timer__path-remaining" cx="50%" cy="50%" r={radius} strokeDasharray={`${progress} ${circumference}`}></circle>
                    </svg>
                </section>
            </section>
            <section className="timer-controls">
                <button className="timer-controls__buttons" onClick={handleRestart}>
                    <img className="timer-controls__image" src={restart} alt="Restarts the current timer" />
                </button>
                <button className="timer-controls__buttons" onClick={handlePlay}>
                    <img className="timer-controls__image" src={active ? pause : play} alt="Pauses the current timer" />
                </button>
                <button className="timer-controls__buttons">
                    <img className="timer-controls__image" src={skip} alt="Skips the session" />
                </button>
            </section>
        </>
    )
}