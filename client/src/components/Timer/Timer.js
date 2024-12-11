import "./Timer.scss";
import { useEffect, useState } from "react";

export default function Timer() {
    const [totalTime, setTotalTime] = useState(45);
    const radius = 92;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(circumference);

    function formatTime(totalTime) {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    useEffect(() => {
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
    }, [circumference]);

    return (
        <section className="base-timer">
            <section className="base-timer__circle">
                <span id="base-timer-label" className="base-timer__label">
                    {formatTime(totalTime)}
                </span>
                <svg className="base-timer__svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <circle className="base-timer__path-elapsed" cx="50%" cy="50%" r={radius}></circle>
                    <circle className="base-timer__path-remaining" cx="50%" cy="50%" r={radius} strokeDasharray={`${progress} ${circumference}`}
                    ></circle>
                </svg>
            </section>
        </section >
    )
}