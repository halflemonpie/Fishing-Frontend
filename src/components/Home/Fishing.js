import React, { useState, useEffect } from "react";
import MyStopwatch from "./Stopwatch";
import { useStopwatch } from "react-timer-hook";
import ReactModal from "react-modal";
import axios from "axios";
import MoverContainer from "./MoverContainer";

export default function Fishing() {
  // state for image
  const [img, setImg] = useState("idle");
  // mover show and moving condition
  const [moving, setMoving] = useState(false);
  // mover position
  const [mover, setMover] = useState(0);
  // moving speed in second, if number is smaller, the mover will move faster
  const [moverSpeed, SetMoverSpeed] = useState(10);

  // setup state for the waiting time
  const [idleTime, setIdleTime] = useState(0);
  const [dippingTime, setDippingTime] = useState(0);
  const [runAwayTime, setRunAwayTime] = useState(0);

  // state for opening model
  const [modalIsOpen, setModalIsOpen] = useState({
    resultPage: false,
    fishListPage: false,
    fishDetailPage: false,
  });
  // result to display for modal
  const [result, setResult] = useState("");

  // state for the timer
  const { seconds, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  // data from my backend
  const [fishData, setFishData] = useState([]);

  // get data from api
  useEffect(() => {
    axios.get("http://localhost:8000/fish/").then((res) => {
      console.log(res.data);
      setFishData(res.data);
    });
  }, []);
  console.log(fishData[0]);
  // check condition to change image
  useEffect(() => {
    console.log(`wait time1: ${idleTime}`);
    console.log(`wait time2: ${dippingTime}`);
    console.log(`wait time3: ${runAwayTime}`);
    if (seconds == idleTime && seconds !== 0) {
      setImg("dipping");
    } else if (seconds == dippingTime && seconds !== 0) {
      setImg("idle");
    } else if (seconds >= runAwayTime && seconds !== 0) {
      reset();
    }
  }, [seconds]);

  // start/reset function
  const handleWait = () => {
    setImg("idle");
    reset();
    let timer1 = Math.floor(Math.random() * (10 - 5) + 5);
    let timer2 = Math.floor(
      Math.random() * (timer1 + 5 - (timer1 + 3)) + (timer1 + 3)
    );
    let timer3 = timer2 + 5;

    setIdleTime(timer1);
    setDippingTime(timer2);
    setRunAwayTime(timer3);
  };

  // pull the hook and start mini game
  const handlePull = () => {
    pause();

    if (seconds < idleTime) {
      setImg("miss");
      console.log("too early");
      setResult("early");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 3000);
    } else if (seconds <= dippingTime) {
      setImg("dipping");
      setMoving(!moving);
      console.log("you got it");
    } else {
      setImg("miss");
      console.log("too late");
      setResult("late");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 3000);
    }
  };

  //
  const handleCatch = () => {
    setMoving(false);
    if (mover >= 4) {
      setImg("get");
      setResult("get");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 5000);
      console.log("good");
    } else {
      setImg("fail");
      console.log("no good");
      setResult("fail");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 8000);
    }
  };

  // modal
  let modal;
  if (result == "early") {
    modal = (
      <div>
        <h1>Too early!</h1>
        <p>
          You pull the hook too early,so you didn't get anything. Please be
          patient.
        </p>
      </div>
    );
  } else if (result == "late") {
    modal = (
      <div>
        <h2>To Late!</h2>
        <p>The fish ran away</p>
      </div>
    );
  } else if (result == "fail") {
    modal = (
      <div>
        <h1>Nice Try!</h1>
        <p>
          The fish still got away. Focus on keeping the fish in the selected
          area
        </p>
      </div>
    );
  } else if (result == "get") {
    modal = (
      <div>
        <h1>Congratulation</h1>
        <p>you get a new fish</p>
        <h1>{fishData[0]["species_name"]}</h1>
        <img
          src={
            fishData[0][
              "species_illustration_photo"
            ].src
          }
          alt="fish"
        />
      </div>
    );
  }

  const modalOnClose = (modal) => {
    setModalIsOpen({ ...modalIsOpen, [modal]: false });
    setImg("idle");
  };

  return (
    <div className="fishing">
      <button onClick={handleWait}>start</button>
      <button onClick={handlePull}>pull</button>
      <button onClick={handleCatch}>Catch</button> <br />
      <MoverContainer
        moverSpeed={moverSpeed}
        moving={moving}
        mover={mover}
        setMover={setMover}
      />
      <MyStopwatch
        seconds={seconds}
        isRunning={isRunning}
        start={start}
        pause={pause}
        reset={reset}
      />
      <img
        src={require(`../../images/fish_${img}.gif`)}
        alt="an old man fishing"
      />
      <button
        onClick={() => setModalIsOpen({ ...modalIsOpen, resultPage: true })}
      >
        Open Modal
      </button>
      <ReactModal isOpen={modalIsOpen.resultPage}>
        <button onClick={() => modalOnClose("resultPage")}>Close</button>
        {modal}
      </ReactModal>
    </div>
  );
}
