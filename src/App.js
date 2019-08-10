import React, { useState, useEffect } from "react";
import Usa from "@svg-maps/usa";
import { CheckboxSVGMap } from "react-svg-map";
import { RadioGroup, RadioButton } from "react-radio-buttons";
//Style
import "react-svg-map/lib/index.css";
import "./App.css";
//Components
import Legend from "./components/Legend";

function App() {
  const [turnOutData, setTurnOutData] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState([]);
  const [groupSelected, setGroupSelected] = useState(0);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [year, setYear] = useState(2016);
  const [inPhone, setInPhone] = useState();
  const SteinStore = require("stein-js-client");
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/5d4d8f23bb4eaf04c5eaa190"
  );

  useEffect(() => {
    if (window.innerWidth > 960) setInPhone(true)
    else setInPhone(false)
  })

  useEffect(() => {
    if (turnOutData && turnOutData.length === 0) fetchData();
  });

  useEffect(() => {
      fetchData(year);
    },
    [year]
  );

  const fetchData = (year) => {
    let sheetNum = "Sheet"
    switch (year) {
      case 2016:
        sheetNum += 1;
        break;
      case 2012:
          sheetNum += 2;
          break;
      case 2008:
          sheetNum += 3;
          break;
      default: 
        sheetNum += 1;
        break;
    }
    
    store.read(sheetNum, { limit: 51, offset: 1 }).then(data => {
      setTurnOutData(data);
    })
  }

  const mouseOver = e => {
    let position = {
      x: e.clientY + 10,
      y: e.clientX - 100
    };
    let name = e.target.getAttribute("name");
    if (turnOutData) {
      turnOutData.forEach(item => {
        if (item.state.toLowerCase() === name.toLowerCase()) setTooltipInfo(item);
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
    let pct;
    if (
      turnOutData &&
      turnOutData[index] &&
      turnOutData[index].state.toLowerCase() === location.name.toLowerCase()
    ) {
      idx = index;
    } else if (turnOutData) {
      idx = turnOutData.findIndex(data => {
        return data.state.toLowerCase() === location.name.toLowerCase();
      });
    }

    if ((idx || idx === 0) && turnOutData[idx]) {
      let num =
        !turnOutData[idx]['VEP Total Ballots Counted'] ? turnOutData[idx]['VEP Highest Office'] : turnOutData[idx]['VEP Total Ballots Counted'];
      if (num) pct = round5(parseInt(num.replace(/%/g, ""), 10));
    }
    if (!groupSelected) {
      return `svg-map__location svg-map__location--heat${pct}`;
    } else {
      let highlight = pct === groupSelected ? pct : "down";
      return `svg-map__location svg-map__location--heat${highlight}`;
    }
  };

  const getAllInGroup = percentage => setGroupSelected(percentage);

  const onChange = e => setYear(parseInt(e));

  return (
    <div className="App">
      <div className="map">
        <CheckboxSVGMap
          map={Usa}
          locationClassName={(location, index) =>
            getLocationClassName(location, index)
          }
          onLocationMouseOver={e => mouseOver(e)}
          onLocationMouseOut={() => mouseOut()}
        />
        {tooltipInfo && (
          <div
            className="map__tooltip"
            style={coordinates.x !== 0 ? show : hide}
          >
            <h3>{tooltipInfo.state}</h3>
            <p>
              <strong>VEP turnout: </strong>
              {tooltipInfo['VEP Total Ballots Counted'] === "" ? tooltipInfo['VEP Highest Office'] : tooltipInfo['VEP Total Ballots Counted']}
            </p>
            <p>
              <strong>VEP: </strong>
              {tooltipInfo['Voting-Eligible Population (VEP)']}
            </p>
          </div>
        )}
        <div className="title">USA Voters Turnout {year}</div>
        <div className="radioButtons">
          <RadioGroup onChange={e => onChange(e)} horizontal={inPhone}>
            <RadioButton value="2016" checked={year === 2016}>
              2016
            </RadioButton>
            <RadioButton value="2012" checked={year === 2012}>
              2012
            </RadioButton>
            <RadioButton value="2008" checked={year === 2008}>
              2008
            </RadioButton>
          </RadioGroup>
        </div>
      </div>
      <Legend getAllInGroup={p => getAllInGroup(p)} />
    </div>
  );
}

export default App;
