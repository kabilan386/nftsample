import useCountDownTime from "hooks/useCountDownTime";
import React, { useEffect, useState } from "react";

const TimeCountDown = ({ time, enableBid, bidTime }) => {

  


  const [date, setDate] = useState()
  const [hours, setHours] = useState()
  const [minute, setMinte] = useState()
  const [seconds, setSeconds] = useState()

  console.log(time, "time")



  // console.log(new Date(time), "time")
  // const day = new Date(time);
  // console.log(day.getMonth(), "month")
  // const timeLeft = useCountDownTime();

  console.log(enableBid, bidTime, time, "BidTime")

  const calculateTimeLeft = () => {


    // let year = new Date(time).getFullYear();
    // let month = new Date(time).getMonth();
    let difference = +new Date(enableBid === true ? bidTime : time) - +new Date();

    console.log(difference, "difference")

    console.log(difference, "difference")

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
  
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
     setTimeLeft(calculateTimeLeft());
     console.log(timeLeft, "timeLeft")
     console.log("Hi")
    }, 1000);
    return () => clearTimeout(timer);
  });

  console.log(timeLeft, "days")



  return (
    <div className="space-y-5">
      <div className="text-neutral-500 dark:text-neutral-400 flex items-center space-x-2 ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 2H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="leading-none mt-1">Auction ending in:</span>
      </div>
      <div className="flex space-x-5 sm:space-x-10">
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.days}
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            Days
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.hours}
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            hours
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.minutes}
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            minutes
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.seconds}
          </span>
          <span className="sm:text-lg text-neutral-500">seconds</span>
        </div>
      </div>
    </div>
  );
};

export default TimeCountDown;
