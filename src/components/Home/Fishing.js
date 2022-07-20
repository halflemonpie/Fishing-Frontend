import React, { useState, useEffect } from "react";
import MyStopwatch from "./Stopwatch";
import { useStopwatch } from "react-timer-hook";
import ReactModal from "react-modal";
import MoverContainer from "./MoverContainer";
import idle from "../../images/fish_idle.gif";
import dipping from "../../images/fish_dipping.gif";
import fail from "../../images/fish_fail.gif";
import get from "../../images/fish_get.gif";
import miss from "../../images/fish_miss.gif";
import { Link } from "react-router-dom";

export default function Fishing({
  fishData,
  setCurrent,
  setUserFishList,
  userFishList,
}) {
  // state for image
  const [img, setImg] = useState(idle);
  // mover show and moving condition
  const [moving, setMoving] = useState(false);
  // mover position
  const [mover, setMover] = useState(0);
  // moving speed in second, if number is smaller, the mover will move faster
  const [moverSpeed, SetMoverSpeed] = useState(100);

  // setup state for the waiting time
  const [idleTime, setIdleTime] = useState(0);
  const [dippingTime, setDippingTime] = useState(0);
  const [runAwayTime, setRunAwayTime] = useState(0);

  // state for opening model
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // result to display for modal
  const [result, setResult] = useState("");

  // state for the timer
  const { seconds, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  // state for hidden items
  const [hidden, setHidden] = useState({
    mover: true,
    startButton: false,
    pullButton: true,
    catchButton: true,
  });

  // state for hint
  const [hint, setHint] = useState("Click Start to Play");

  // index for the new fish
  const [newFishIndex, setNewFishIndex] = useState(0);

  // check condition to change image
  useEffect(() => {
    // console.log(`wait time1: ${idleTime}`);
    // console.log(`wait time2: ${dippingTime}`);
    // console.log(`wait time3: ${runAwayTime}`);
    if (seconds === idleTime && seconds !== 0) {
      setImg(dipping);
      setHint("Click Pull Right Now!!!");
    } else if (seconds === dippingTime && seconds !== 0) {
      setImg(idle);
      setHint("Still Waiting.......");
    } else if (seconds >= runAwayTime && seconds !== 0) {
      reset();
    }
  // eslint-disable-next-line
  }, [seconds]);

  // start/reset function
  const handleWait = () => {
    setHidden({ ...hidden, startButton: true, pullButton: false });
    setImg(idle);
    let index = Math.floor(Math.random() * 117);
    setNewFishIndex(index);
    // console.log(fishData[index].rarity);
    if (fishData[index].rarity === 1) {
      SetMoverSpeed(100);
    } else if (fishData[index].rarity === 2) {
      SetMoverSpeed(10);
    } else if (fishData[index].rarity === 3) {
      SetMoverSpeed(5);
    }
    setHint("Waiting....");
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
      setImg(miss);
      setResult("early");
      setHint("Too Early!");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 3000);
    } else if (seconds <= dippingTime) {
      setImg(dipping);
      setHint("Catch the Fish in Net Zone!");
      setHidden({
        ...hidden,
        mover: false,
        catchButton: false,
        pullButton: true,
      });
      setMoving(!moving);
      console.log("you got it");
    } else {
      setImg(miss);
      setHint("Too Late!");
      setResult("late");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 3000);
    }
  };

  //
  const handleCatch = () => {
    setMoving(false);
    if (mover < 30 && mover > 20) {
      setImg(get);
      console.log(newFishIndex);
      setUserFishList([...userFishList, fishData[newFishIndex]]);
      setResult("get");
      setHint("You got it!!!");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 5000);
      console.log("good");
    } else {
      setImg(fail);
      console.log("no good");
      setResult("fail");
      setHint("Nice Try!");
      setTimeout(() => {
        setModalIsOpen(true);
      }, 8000);
    }
  };

  const modalOnClose = () => {
    setModalIsOpen(false);
    setImg(idle);
    setHint("Click Start to Play Again");
    setHidden({
      mover: true,
      startButton: false,
      pullButton: true,
      catchButton: true,
    });
  };
  // modal
  let modal;
  if (result === "early") {
    modal = (
      <div className="flex flex-col justify-center content-center">
        <h1 className="text-6xl mb-10 text-center">Too early!</h1>
        <div className="grid grid-cols-2">
          <img
            src="https://c.tenor.com/EWIuxOhLQNkAAAAC/fishing-rod-snap.gif"
            alt="someone who falls into water while fishing"
          />
          <p>
            You pull the hook too early,so you didn't get anything. Please be
            patient.
          </p>
        </div>
      </div>
    );
  } else if (result === "late") {
    modal = (
      <div className="flex flex-col justify-center content-center">
        <h1 className="text-6xl mb-10 text-center">To Late!</h1>
        <div className="grid grid-cols-2">
          <img
            src="https://thumbs.gfycat.com/DependablePastAzurevasesponge-size_restricted.gif"
            alt="someone who falls into water while fishing"
          />
          <p>The fish ran away. Act quick next time.</p>
        </div>
      </div>
    );
  } else if (result === "fail") {
    modal = (
      <div className="flex flex-col justify-center content-center">
        <h1 className="text-6xl mb-10 text-center">Nice Try!</h1>
        <div className="grid grid-cols-2">
          <img
            src="https://media1.giphy.com/media/L2GmlnGZXl0BPf2DE9/giphy.gif"
            alt="fish ran away from the hook"
          />
          <p>
            The fish still got away. Focus on keeping the fish in the selected
            area.
          </p>
        </div>
      </div>
    );
  } else if (result === "get") {
    modal = (
      <div className="flex flex-col justify-center content-center">
        <h1 className="text-6xl mb-10 text-center">Congratulation!</h1>
        <p>You got a new fish.</p>
        <Link
          to="/fishBook"
          onClick={() => {
            setCurrent(newFishIndex);
            modalOnClose();
          }}
        >
          <h1 className="text-center mt-5">
            {fishData[newFishIndex]["species_name"]}
          </h1>
          <img
            src={fishData[newFishIndex]["species_illustration_photo"].src}
            alt="fish"
          />
        </Link>
      </div>
    );
  }

  const modalStyles = {
    content: {
      top: "10vh",
      left: "25vw",
      border: "1px solid #ccc",
      background: "linear-gradient(white, cyan)",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
      width: "50vw",
      height: "70vh",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div className="fishing" style={{ backgroundImage: `url(${img})` }}>
      <MoverContainer
        moverSpeed={moverSpeed}
        moving={moving}
        mover={mover}
        setMover={setMover}
        hidden={hidden}
      />
      <button
        className="hover:bg-orange-400 button bg-sky-200 rounded-lg border-4"
        hidden={hidden.startButton}
        onClick={handleWait}
      >
        <i class="fa-solid fa-anchor"></i>
        Start
      </button>
      <button
        hidden={hidden.pullButton}
        className="hover:bg-orange-400 button bg-sky-200 rounded-lg border-4"
        onClick={handlePull}
      >
        <i class="fa-solid fa-turn-up"></i>
        pull
      </button>

      <button
        className="hover:bg-orange-400 button bg-sky-200 rounded-lg border-4"
        hidden={hidden.catchButton}
        onClick={handleCatch}
      >
        Catch
      </button>
      <p>{hint}</p>
      <br />
      <MyStopwatch
        seconds={seconds}
        isRunning={isRunning}
        start={start}
        pause={pause}
        reset={reset}
      />
      {/* <img
        src={require(`../../images/fish_${img}.gif`)}
        alt="an old man fishing"
      /> */}
      {/* <button
        onClick={() => setModalIsOpen({ ...modalIsOpen, resultPage: true })}
      >
        Open Modal
      </button> */}
      <ReactModal ariaHideApp={false} isOpen={modalIsOpen} style={modalStyles}>
        <div className="flex justify-end">
          <button
            className="hover:bg-orange-400 rounded-lg border-4 border-orange-200 bg-sky-400 pl-2 pr-2 pt-1 pb-1"
            onClick={modalOnClose}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        {modal}
        <div className="flex justify-center">
          <button
            className="hover:bg-orange-400 rounded-lg border-4 border-orange-200 bg-sky-400 p-2 mt-5"
            onClick={modalOnClose}
          >
            OK
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
