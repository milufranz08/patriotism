import React, { useState, useEffect } from "react";
import Usa from "@svg-maps/usa";
import { CheckboxSVGMap } from "react-svg-map";
import { RadioGroup, RadioButton } from "react-radio-buttons";
//Style
import "react-svg-map/lib/index.css";
import "./App.css";
//Components
import Legend from "./components/Legend";
//Api
import { getData, getAgeDistData } from "./api/data";

function App() {
  const [turnOutData, setTurnOutData] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState([]);
  const [groupSelected, setGroupSelected] = useState(0);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [year, setYear] = useState(2016);
  const [ageGrouping, setAgeGrouping] = useState([]);

  useEffect(
    () => {
      async function fetchData() {
        const data = await getAgeDistData();
        // console.log("data.values", data.values);
        if (turnOutData && groupSelected && data.values) {
          let group = [];
          turnOutData.forEach(item => {
            let num = item[3] === "" ? item[4] : item[3];
            let pct = round5(parseInt(num.replace(/%/g, ""), 10));
            if (pct === groupSelected) {
              data.values.forEach(d => {
                if (d[0].toLowerCase() === item[0].toLowerCase()) group.push(d);
              });
            }
          });

          setAgeGrouping(group);
        }
      }

      fetchData();
    },
    [groupSelected]
  );

  useEffect(() => {
    async function fetchData() {
      const data = await getData(2016);
      setTurnOutData(data.values);
    }

    if (turnOutData && turnOutData.length === 0) fetchData();
  });

  useEffect(
    () => {
      async function fetchData() {
        const data = await getData(year);
        setTurnOutData(data.values);
      }
      fetchData();
    },
    [year]
  );

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
    setAgeGrouping([]);
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
      turnOutData[index][0].toLowerCase() === location.name.toLowerCase()
    ) {
      idx = index;
    } else if (turnOutData) {
      idx = turnOutData.findIndex(data => {
        return data[0].toLowerCase() === location.name.toLowerCase();
      });
    }

    if ((idx || idx === 0) && turnOutData[idx]) {
      let num =
        turnOutData[idx][3] === "" ? turnOutData[idx][4] : turnOutData[idx][3];
      pct = round5(parseInt(num.replace(/%/g, ""), 10));
    }
    if (!groupSelected) {
      return `svg-map__location svg-map__location--heat${pct}`;
    } else {
      let highlight = pct === groupSelected ? pct : "down";
      return `svg-map__location svg-map__location--heat${highlight}`;
    }
  };

  const getAllInGroup = percentage => {
    // console.log({ percentage });
    setGroupSelected(percentage);
  };

  const onChange = e => {
    setYear(parseInt(e));
  };

  console.log({ ageGrouping });

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
        <div className="title">USA Voters Turnout {year}</div>
        <div className="radioButtons">
          <RadioGroup onChange={e => onChange(e)} horizontal>
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
