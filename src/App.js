import React from "react";
import Usa from "@svg-maps/usa";
import { CheckboxSVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CheckboxSVGMap map={Usa} />
    </div>
  );
}

export default App;
