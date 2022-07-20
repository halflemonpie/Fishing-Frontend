import React, { useState } from "react";

export default function Mover({ mover, moverSpeed, i }) {
  let color;
  if (i < 30 && i > 20) {
    color =
      "url(https://thumbs.dreamstime.com/b/seamless-net-texture-pattern-black-squares-white-seamless-net-texture-pattern-black-squares-white-background-118688870.jpg)";
  }
  return (
    <div
      className="mover-container"
      style={{
        background: `${color}`,
        backgroundAttachment: "fixed",
        backgroundSize: "50%",
      }}
    >
      {/* <div
        className="mover"
        style={{
          transition: `transform ${moverSpeed / 1000}s linear`,
          transform: `translateY(${(mover - i) * 5}px)`,
        }}
      /> */}
      <i
        className="fa-solid fa-fish-fins mover"
        style={{
          transition: `transform ${moverSpeed / 1000}s linear`,
          transform: `translateY(${(mover - i) * 5}px)`,
        }}
      ></i>
    </div>
  );
}
