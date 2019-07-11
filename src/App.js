import React, { useState } from "react";
import Usa from "@svg-maps/usa";
import { CheckboxSVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./App.css";

function App() {
  const [tooltipLabel, setTooltipLabel] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const mouseOver = e => {
    let position = {
      x: e.clientY + 10,
      y: e.clientX - 100
    };
    setTooltipLabel(e.target.getAttribute("name"));
    setCoordinates(position);
  };

  const mouseOut = () => {
    setTooltipLabel("");
    setCoordinates({ x: 0, y: 0 });
  };

  const hide = {
    display: "none"
  };

  let show = {
    display: "block",
    top: coordinates.x + "px",
    left: coordinates.y + "px"
  };

  return (
    <div className="App">
      <CheckboxSVGMap
        map={Usa}
        onLocationMouseOver={e => mouseOver(e)}
        onLocationMouseOut={() => mouseOut()}
      />
      <div className="map__tooltip" style={coordinates.x !== 0 ? show : hide}>
        {tooltipLabel}
      </div>
    </div>
  );
}

export default App;
