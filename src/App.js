import logo from "./logo.svg";
import "./App.css";
import data from "./new.json";
import React, { useState, useEffect, useRef } from "react";
import Timer from "./components/Timer";
import MyStopwatch from "./components/Stopwatch";
import { useStopwatch } from 'react-timer-hook';
import ReactModal from 'react-modal';


// todo:
// close modal reset

function App() {
  const [img, setImg] = useState("idle");
  const items = [0, 1, 2, 3, 4, 5, 6, 7];
  const [mover, setMover] = useState(0);
  const increment = useRef(1);
  const [time, SetTime] = useState(100)
  const [condition, setCondition] = useState(false)
  const [fishing, setFishing] = useState(true)
  const [fishTime, setFishTime] = useState(0)


  const [waitTime, setWaitTime] = useState(0)
  const [waitTime2, setWaitTime2] = useState(0)
  const [waitTime3, setWaitTime3] = useState(0)
  console.log(data);

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalDisplay, setModalDisplay] = useState("")

  const {
    seconds,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    // console.log("i am working");
    console.log(`wait time1: ${waitTime}`);
    console.log(`wait time2: ${waitTime2}`);
    console.log(`wait time3: ${waitTime3}`);
    if (seconds == waitTime && seconds !== 0) {
      // console.log("coming");
      setImg("dipping")
    } else if (seconds == waitTime2 && seconds !== 0) {
      // console.log("ran away");
      setImg("idle")
    } else if (seconds >= waitTime3 && seconds !== 0) {
      reset()
    }
  }, [fishTime]) 
  

  
  useEffect(() => {
    if (condition === true) {
      let interval = setInterval(() => {
        if (mover >= items.length - 1) {
          console.log("hello");
          increment.current = -1;
        } else if (mover <= 0) {
          console.log("hi");
          increment.current = 1;
        }
        setMover(mover + increment.current);
      }, time);
      return () => clearInterval(interval);
    }
  }, [condition, mover]);

  // let fishing = true
  // useEffect(() => {
  //   handleWait()
  // }, [fishing])
  // let waitTime;
  // let waitTime2;
  // let waitTime3;
  async function handleWait () {
    setImg("idle")
   reset()
  let timer1 = Math.floor(Math.random() * (10 - 5) + 5)
  let timer2 = Math.floor(Math.random() * ((timer1 + 5) - (timer1 + 3)) + (timer1 + 3))
  let timer3 = timer2 + 5

   setWaitTime(timer1)
   setWaitTime2(timer2)
   setWaitTime3(timer3)

  //  console.log(waitTime);
  //  if (fishTime == Math.floor(Math.random() * (10 - 5) + 5)) {
  //   console.log("hi");
  //   setImg("coming")
  //  } else {
  //   console.log("not working");
  //  }

      // console.log("working");
      // setTimeout(() => {
      //   if (img == "idle") {
      //     setImg("coming")
      //   }
      //   setTimeout(() => {
      //     if (img != "catch") {
            
      //       console.log("the fish ran away");
      //       setImg('idle');
      //     }
      //   }, Math.floor(Math.random() * (5000 - 1000) + 1000));
      // }, Math.floor(Math.random() * (20000 - 5000) + 5000));
  
  }

  const handleCatch = () => {
    pause()
    
    if (seconds < waitTime) {
      setImg("miss")
      console.log("too early");
      setModalDisplay("early");
      setTimeout(() => {
        setModalIsOpen(true)
      }, 3000)
    } else if (seconds <= waitTime2) {
      setImg("dipping")
      setCondition(!condition)
      console.log("you got it");
    } else {
      setImg("miss")
      console.log("too late");
      setModalDisplay("late");
      setTimeout(() => {
        setModalIsOpen(true)
      }, 3000)
    }
  }

  const handlePull = () => {
    setCondition(false)
    if (mover >= 4) {
      setImg("get")
      setModalDisplay("get");
      setTimeout(() => {
        setModalIsOpen(true)
      }, 5000)
      console.log("good");
    } else {
      setImg("fail")
      console.log("no good");
      setModalDisplay("fail");
      setTimeout(() => {
        setModalIsOpen(true)
      }, 8000)
    }
  }
  let modal;
  if (modalDisplay == "early") {
    modal = (
      <div>
        <h1>Too early!</h1>
        <p>You pull the hook too early,so you didn't get anything. Please be patient.</p>
      </div>
    )
  } else if (modalDisplay == "late") {
    modal = (
      <div>
        <h2>To Late!</h2>
        <p>The fish ran away</p>
      </div>
    )
  } else if (modalDisplay == "fail") {
    modal = (
      <div>
        <h1>Nice Try!</h1>
        <p>The fish still got away. Focus on keeping the fish in the selected area</p>
      </div>
    )
  } else if (modalDisplay == "get") {
    modal = (
      <div>
        <h1>Congratulation</h1>
        <p>you get a new fish</p>
        <h1>{data[0]["Species Name"]}</h1>
        <img src={data[Math.floor(Math.random()* 19)]["Species Illustration Photo"].src} alt="fish"/>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>hello world</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data[0]["Physical Description"] }}
      />
      <button onClick={handleWait}>start</button>
      <button onClick={handleCatch}>pull</button> <br></br>
      <button onClick={handlePull}>Catch</button> <br />
      <img src={require(`./images/fish_${img}.gif`)} alt="an old man fishing" />
      <div className="background">
        {items.map((i) => {
          return (
            <div className="circle">{i}
              <div
                className="mover"
                style={{
                  transition: `transform ${time / 1000}s linear`,
                  transform: `translateX(${(mover - i) * 40}px)`,
                }}
              />
            </div>
          );
        })}
      </div>
        <MyStopwatch setFishTime={setFishTime} seconds={seconds} isRunning={isRunning} start={start} pause={pause} reset={reset}/>
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
        <ReactModal isOpen={modalIsOpen} >
          <button onClick={() => setModalIsOpen(false)}>Close</button>
          {modal}
        </ReactModal>
        {/* <img src="" /> */}
    </div>
  );
}

export default App;
