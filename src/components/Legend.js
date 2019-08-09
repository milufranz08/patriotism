import React from "react";
// import ReactSvgDonutChart from "react-svg-donut-chart";
import "../App.css";

function Legend(props) {
  const { getAllInGroup } = props;
  return (
    <div className="legend">
      <h4 className="legend-num">30%</h4>
      <div
        className="legend-rec c30"
        onMouseOver={() => getAllInGroup(30)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">35%</h4>
      <div
        className="legend-rec c35"
        onMouseOver={() => getAllInGroup(35)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">40%</h4>
      <div
        className="legend-rec c40"
        onMouseOver={() => getAllInGroup(40)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">45%</h4>
      <div
        className="legend-rec c45"
        onMouseOver={() => getAllInGroup(45)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">50%</h4>
      <div
        className="legend-rec c50"
        onMouseOver={() => getAllInGroup(50)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">55%</h4>
      <div
        className="legend-rec c55"
        onMouseOver={() => getAllInGroup(55)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">60%</h4>
      <div
        className="legend-rec c60"
        onMouseOver={() => getAllInGroup(60)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">65%</h4>
      <div
        className="legend-rec c65"
        onMouseOver={() => getAllInGroup(65)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">70%</h4>
      <div
        className="legend-rec c70"
        onMouseOver={() => getAllInGroup(70)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">75%</h4>
      <div
        className="legend-rec c75"
        onMouseOver={() => getAllInGroup(75)}
        onMouseOut={() => getAllInGroup(0)}
      />
      <h4 className="legend-num">80%</h4>
      <div
        className="legend-rec c80"
        onMouseOver={() => getAllInGroup(80)}
        onMouseOut={() => getAllInGroup(0)}
      />
    </div>
  );
}
export default Legend;
