import React, { Fragment, useRef, useContext, useState, useEffect } from "react";
import axios from 'axios';
import SignIn from "./pages/SignIn";
import path from "./components/Frame.png";

import UserState from "./context/User/UserState";
import { UserContextData } from "./context/types";
import UserContext from "./context/User/userContext";
import SaveFrame from "./pages/SaveFrame";
import SavedFrame from "./pages/SavedFrame";
import _ from "lodash";
import { Buffer as BufferPolyfill } from 'buffer'
declare var Buffer: typeof BufferPolyfill;
globalThis.Buffer = BufferPolyfill
import { fromUint8Array} from 'js-base64';


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

  const [stored_id, setStored_id] = useState<string>("Enter your rembo id");

  useEffect(() => {
    parent.postMessage(
      { pluginMessage: { type: "pull-rembo-id" } },
      "*"
    );
  }, []);

  let onPush = _.debounce(() => {
    parent.postMessage(
      { pluginMessage: { type: "push-selection" } },
      "*"
    );
  }, 2000, {
    'leading': true,
    'trailing': false
  });

  interface Data {
    frameData: any;
    imageData: any;
    height: number;
    width: number;
    name: string;
  }


  const sendData = async (data: Data) => {
    var b64encoded = fromUint8Array(data.imageData);
    console.log(b64encoded);

    const encodedData = {
      frameData: data.frameData, imageData: b64encoded, height: data.height, width: data.width, name: data.name
    }
    if (user) {
      axios.post('http://localhost:3000/api/frame/' + user.id, { data: encodedData }).then((res) => {
        console.log(encodedData);
        console.log(res);
      });
    }
  }

  onmessage = async (event) => {
    if (event.data.pluginMessage) {
      const { type, data } = event.data.pluginMessage;

      switch (type) {
        case "LOADING":
          setLoading(true);
          break;
        case "DATA":
          onPush.cancel();
          await addFrame(data);
          await sendData(data);
          setLoading(false);
          break;
        case "REMBO-ID":
          setStored_id(data);

      }
    }
  };


  return (user ? (selectedFrame ? <SavedFrame frame={selectedFrame} onClick={clearFrame} /> : <SaveFrame frame={selectedFrame} loading={loading} onClick={onPush} />) : <SignIn storedId={stored_id} />)
}

export default App;
