import React, { useEffect, useRef } from "react";
import Container from "./Mover";

export default function MoverContainer({
  mover,
  moving,
  moverSpeed,
  setMover,
  hidden
}) {
  // number of container for the mover div
  const moverContainerNumber = 50;
  // moving direction
  const increment = useRef(1);


  useEffect(() => {
    if (moving === true) {
      let interval = setInterval(() => {
        if (mover >= moverContainerNumber) {
          increment.current = -1;
        } else if (mover <= 0) {
          increment.current = 1;
        }
        setMover(mover + increment.current);
      }, moverSpeed);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line
  }, [moving, mover]);

  let moverContainer = [];
  for (let i = 1; i < moverContainerNumber; i++) {
    moverContainer.push(<Container moverSpeed={moverSpeed} mover={mover} i={i}/>);
  }
  return (
    <div className="mover-div" hidden={hidden.mover}>
      <div className="background">{moverContainer}</div>
    </div>
  );
}
