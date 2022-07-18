import React, { useState } from "react";

export default function Pix() {
  const [pixelColor, setPixelColor] = useState("white");
  return (
    <span
      onClick={() => setPixelColor("red")}
      style={{ backgroundColor: pixelColor }}
    >
      hello
    </span>
  );
}
