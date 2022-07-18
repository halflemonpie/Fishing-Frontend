import React, { useState } from "react";


export default function Mover ({mover, moverSpeed, i}) {
    let color;
    if (i < 40 && i > 10) {
        color = "yellow"
    }
    return (
        <div className="mover-container" style={{background: `${color}`}}>
        <div
          className="mover"
          style={{
            transition: `transform ${moverSpeed / 1000}s linear`,
            transform: `translateY(${(mover - i) * 5}px)`,
          }}
        />
      </div>
    )
}