import React, { Fragment, useRef } from "react";
import logoPng from "./logo.png";
import logoSvg from "./logo.svg?raw";
import Logo from "./Logo";
import "./App.css";

function App() {
  const onPush = () => {
    parent.postMessage(
      { pluginMessage: { type: "push-selection"} },
      "*"
    );
  };

  onmessage = (event) => {
    console.log("got this from the plugin code", JSON.parse(event.data.pluginMessage))
  }
  

  return (<div className="min-h-screen flex flex-col justify-center gap-y-2">
    <h1 className="text-4xl font-bold underline">
      Rembo
    </h1>
    <div className="div">
      <button className="bg-blue-500 hover:bg-blue-700 max-w-sm" onClick={onPush}>
      Push Selection
    </button>
    </div>
  </div>
  );
}

export default App;
