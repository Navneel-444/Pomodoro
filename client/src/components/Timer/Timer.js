import "./Timer.scss";
import { useEffect, useState } from "react";
import pause from "../../assets/icons/Pause.svg";
import restart from "../../assets/icons/Restart.svg";
import skip from "../../assets/icons/Skip.svg";
import play from "../../assets/icons/Play.svg";

export default function Timer() {
    const [totalTime, setTotalTime] = useState(10);
    const radius = 92;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(circumference);
    const [active, setActive] = useState(false);
    const [tracker, setTracker] = useState(0);
    // Clock 
    function formatTime(totalTime) {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    useEffect(() => {
        if (active === true) {
            const timer = setInterval(() => {
                setTotalTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        /* 
                        issue this code updates tracker twice because it updates
                        total time to 0  and returns 0 so it runs the if statement 
                        twice
                        */
                        setTracker((prevNum) => {
                            const newTracker = prevNum + 1;
                            console.log(`tracker is ${newTracker}`);
                            return newTracker;
                        });
                        return 0;
                    }
                    const updatedTime = prevTime - 1;
                    setProgress((updatedTime / 10) * circumference);
                    return updatedTime;
                });
            }, 1000);
        }
    }, [circumference, active]);
    // Tracker
    // Controls
    const handlePlay = () => setActive((prev) => !prev);
    const handleRestart = () => {
        setTotalTime(10);
        setProgress(10 * circumference);
    }
    return (
        <>
            <section className="timer-clock">
                <section className="timer-clock__circle">
                    <span id="timer-clock-label" className="timer-clock__label">
                        {formatTime(totalTime)}
                    </span>
                    <svg className="timer-clock__svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <circle className="timer-clock__path-elapsed" cx="50%" cy="50%" r={radius}></circle>
                        <circle className="timer-clock__path-remaining" cx="50%" cy="50%" r={radius} strokeDasharray={`${progress} ${circumference}`}></circle>
                    </svg>
                    <section className="timer-tracker">
                        <svg className="timer-tracker__completed">
                            <circle cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                        <svg className="timer-tracker__completed">
                            <circle cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                        <svg className="timer-tracker__completed">
                            <circle cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                        <svg className="timer-tracker__completed">
                            <circle cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                    </section>
                </section>
            </section >
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