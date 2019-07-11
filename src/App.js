import React, { useState, useEffect } from "react";
import Usa from "@svg-maps/usa";
import { CheckboxSVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./App.css";

function App() {
  const [turnOutData, setTurnOutData] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getSheetValues = async () => {
      const request = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1VAcF0eJ06y_8T4o2gvIL4YcyQy8pxb1zYkgXF76Uu1s/values/A4:I54`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer ya29.GltCB2GNtonbVtOUszmZrer8j9TpyvnV5QMGB7tKs-j8Ts_4DzkRpsLQ9uF5fcAPSk1WjG0aI5ds4rPAE4YcCW_DWhp6KDKEAl9n6U-lRd9oE_f6hAQDzIRxuOtI"
          }
        }
      );
      const data = await request.json();
      // console.log(data);
      setTurnOutData(data.values);
    };

    if (turnOutData && turnOutData.length === 0) getSheetValues();
  });

  const mouseOver = e => {
    let position = {
      x: e.clientY + 10,
      y: e.clientX - 100
    };
    let name = e.target.getAttribute("name");
    // setTooltipLabel(name);
    if (turnOutData) {
      turnOutData.forEach(item => {
        if (item[0].toLowerCase() === name.toLowerCase()) setTooltipInfo(item);
      });
    }

    setCoordinates(position);
  };

  const mouseOut = () => {
    setTooltipInfo([]);
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

  const round5 = x => {
    return Math.ceil(x / 5) * 5;
  };

  const getLocationClassName = (location, index) => {
    let idx;

    if (
      turnOutData &&
      turnOutData[index] &&
      turnOutData[index][0].toLowerCase() === location.name.toLowerCase()
    ) {
      idx = index;
    } else {
      idx = turnOutData.findIndex(data => {
        return data[0].toLowerCase() === location.name.toLowerCase();
      });
    }

    // if (location.name === "West Virginia") {
    //   console.log("idx", idx);
    //   console.log("turnOutData[idx]", turnOutData[idx]);
    // }

    if ((idx || idx === 0) && turnOutData[idx]) {
      let num =
        turnOutData[idx][3] === "" ? turnOutData[idx][4] : turnOutData[idx][3];
      let percentage = round5(parseInt(num.replace(/%/g, ""), 10));
      if (location.name === "West Virginia") {
        console.log(percentage);
      }
      // console.log("name: " + turnOutData[idx][0] + " number: " + percentage);
      return `svg-map__location svg-map__location--heat${percentage}`;
    }
  };

  return (
    <div className="App">
      <CheckboxSVGMap
        map={Usa}
        locationClassName={(location, index) =>
          getLocationClassName(location, index)
        }
        onLocationMouseOver={e => mouseOver(e)}
        onLocationMouseOut={() => mouseOut()}
      />
      {tooltipInfo && (
        <div className="map__tooltip" style={coordinates.x !== 0 ? show : hide}>
          <h3>{tooltipInfo[0]}</h3>
          <p>
            <strong>VEP turnout: </strong>
            {tooltipInfo[3] === "" ? tooltipInfo[4] : tooltipInfo[3]}
          </p>
          <p>
            <strong>VEP: </strong>
            {tooltipInfo[8]}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
