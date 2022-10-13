import React, { Fragment, useRef, useContext, useState} from "react";
import axios from 'axios';
import SignIn from "./pages/SignIn";
import path from "./components/Frame.png";

import UserState from "./context/User/UserState";
import { UserContextData } from "./context/types";
import UserContext from "./context/User/UserContext";
import SaveFrame from "./pages/SaveFrame";
import SavedFrame from "./pages/SavedFrame";
import _ from "lodash";


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

  const [loading, setLoading] = useState(false);

  let onPush = _.debounce(() => {
    parent.postMessage(
      { pluginMessage: { type: "push-selection" } },
      "*"
    );
  }, 2000, {
    'leading': true,
    'trailing': false
  });

  onmessage = (event) => {
    if (event.data.pluginMessage) {
      const { type, data } = event.data.pluginMessage;

      switch (type) {
        case "LOADING":
          setLoading(true);
          break;
        case "DATA":
          onPush.cancel();
          console.log("got this from the plugin code", data);
          addFrame(data);
          setLoading(false);
          break;
      }
    }
  };

  const sendData = (data: String) => {
    axios.post('http://localhost:3000/api/design', { data }).then((res) => {
      console.log(res)
    });
  }

  

  return (user ? (selectedFrame ? <SavedFrame frame={selectedFrame} onClick={clearFrame} /> : <SaveFrame frame={selectedFrame} loading={loading} onClick={onPush} />) : <SignIn/>)
}

export default App;
