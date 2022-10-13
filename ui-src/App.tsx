import React, { Fragment, useRef, useContext } from "react";
import axios from 'axios';
import SignIn from "./pages/SignIn";
import path from "./components/Frame.png";

import UserState from "./context/User/UserState";
import { UserContextData } from "./context/types";
import UserContext from "./context/User/UserContext";
import SaveFrame from "./pages/SaveFrame";
import SavedFrame from "./pages/SavedFrame";

const onPush = () => {
  parent.postMessage(
    { pluginMessage: { type: "push-selection" } },
    "*"
  );
};

function App() {


  return (
    <React.StrictMode>
      <UserState>
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
          <Content />
        </div>
      </UserState>
    </React.StrictMode>
  );
}

function Content() {
  const userContext = useContext<UserContextData>(UserContext);

  const { user, selectedFrame, addFrame, clearFrame } = userContext;

  onmessage = (event) => {
    if (event.data.pluginMessage) {
      console.log("got this from the plugin code", event.data.pluginMessage);
      addFrame(event.data.pluginMessage);
    }
  };

  const sendData = (data: String) => {
    axios.post('http://localhost:3000/api/design', { data }).then((res) => {
      console.log(res)
    });
  }

  

  return (user ? (selectedFrame ? <SavedFrame frame={selectedFrame} onClick={clearFrame} /> : <SaveFrame frame={selectedFrame} onClick={onPush} />) : <SignIn/>)
}

export default App;
