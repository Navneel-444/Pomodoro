import "./Timer.scss";
import { useEffect, useState } from "react";
import pause from "../../assets/icons/Pause.svg";
import restart from "../../assets/icons/Restart.svg";
import skip from "../../assets/icons/Skip.svg";
import play from "../../assets/icons/Play.svg";

export default function Timer() {
    const radius = 92;
    const circumference = 2 * Math.PI * radius;
    const trackerRecord = document.getElementsByClassName("timer-tracker__marker")
    // States 
    const [presetTime, setPresetTime] = useState(5);
    const [presetRest, setPresetRest] = useState(2);
    const [presetLongRest, setPresetLongRest] = useState(4);

    const [elapsed, setElapsed] = useState(presetTime);
    const [elapsedCircle, setElapsedCircle] = useState(circumference);
    const [active, setActive] = useState(false);
    const [tracker, setTracker] = useState(0);
    const [activeSession, setActiveSession] = useState(true);

    // Clock
    function formatTime(elapsed) {
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    // Tracker
    function removeMarker() {
        document.querySelectorAll('.timer-tracker__marker--completed').forEach(element => {
            element.classList.remove('timer-tracker__marker--completed');
        });
    }

    function marker(numCompleted) {
        if (numCompleted === 4) {
            removeMarker()
            setTracker(0)
        }
        const completedMarker = trackerRecord[numCompleted]
        completedMarker.classList.add("timer-tracker__marker--completed")
    }
    // Controls
    function handlePlay() {
        setActive((prev) => !prev);
    }

    function handleRestart() {
        setActive(false)
        const rest = tracker === 3 ? presetLongRest : presetRest
        const time = activeSession ? rest : presetTime
        setElapsed(time);
        setElapsedCircle(time * circumference);
    }

    function handleSkip() {
        handleRestart()
        setActiveSession(activeSession ? false : true)
    }

    useEffect(() => {
        if (active & elapsed >= 0) {
            const timer = setInterval(() => {
                setElapsed((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        setActive(false)
                        return 0;
                    }
                    const updatedTime = prevTime - 1;
                    setElapsedCircle((updatedTime / presetTime) * circumference);
                    return updatedTime
                });
            }, 1000)
            if (elapsed === 0) {
                setActive(false);
                if (activeSession) {
                    setActiveSession(false);
                    setTracker((prevNum) => prevNum + 1);
                    marker(tracker);
                    handleRestart();
                } else {
                    handleRestart();
                    setActiveSession(true);
                }
            }
            return () => clearInterval(timer);
        }
    }, [circumference, active, elapsedCircle, elapsed, tracker]);

    return (
        <>
            <section className="timer-clock">
                <section className="timer-clock__circle">
                    <span id="timer-clock-label" className="timer-clock__label">
                        {formatTime(elapsed)}
                    </span>
                    <svg className="timer-clock__svg" xmlns="http://www.w3.org/2000/svg">
                        <circle className="timer-clock__path-elapsed" cx="50%" cy="50%" r={radius}></circle>
                        <circle className="timer-clock__path-remaining" cx="50%" cy="50%" r={radius} stroke={activeSession ? "#01497C" : "#7e3501"} strokeDasharray={`${elapsedCircle} ${circumference}`}></circle>
                    </svg>
                    <section className="timer-tracker">
                        <svg className="timer-tracker__record" >
                            <circle className="timer-tracker__marker" cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                        <svg className="timer-tracker__record" >
                            <circle className="timer-tracker__marker" cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                        <svg className="timer-tracker__record" >
                            <circle className="timer-tracker__marker" cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                        <svg className="timer-tracker__record" >
                            <circle className="timer-tracker__marker" cx="50%" cy="50%" r="2.5"></circle>
                        </svg>
                    </section>
                </section>
            </section >
            <section className="timer-controls">
                <button className="timer-controls__buttons" onClick={handleRestart}>
                    <img className="timer-controls__image" src={restart} alt="Restarts the current timer" />
                </button>
                <button className="timer-controls__buttons" onClick={handlePlay}>
                    <img className="timer-controls__image" src={active & elapsed > 0 ? pause : play} alt="Pauses the current timer" />
                </button>
                <button className="timer-controls__buttons" onClick={handleSkip}>
                    <img className="timer-controls__image" src={skip} alt="Skips the session" />
                </button>
            </section>
        </>
    )
}