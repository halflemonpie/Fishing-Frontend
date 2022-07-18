import React, { useState, useEffect, useRef } from "react";
import Container from "./Mover";

export default function MoverContainer({
  mover,
  moving,
  moverSpeed,
  setMover
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
  }, [moving, mover]);

  let moverContainer = [];
  for (let i = 0; i < moverContainerNumber; i++) {
    moverContainer.push(<Container moverSpeed={moverSpeed} mover={mover} i={i}/>);
  }
  return (
    <div>
      <div className="background">{moverContainer}</div>
    </div>
  );
}
