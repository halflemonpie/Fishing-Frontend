import React, { useEffect, useState } from "react";
import Pix from "./pix";

export default function Test() {
  const [row, setRow] = useState(5);
  const [col, setCol] = useState(5);

  let display = new Array();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      display.push(<Pix />);
    }
    display.push(<br />);
  }

  return (
    <div>
      {display}
      <button onClick={() => setRow(row + 1)}>add row</button>
      <button onClick={() => setCol(col + 1)}>add col</button>
    </div>
  );
}
