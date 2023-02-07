import { useState } from "react";

import Editor from "./components/editor";
import Login from "./components/login";

function App() {
  const [token, setToken] = useState("");
  console.log("Token: ", token);

  return (
    <div>
        {/* <Editor/> */}

        {token ? <Editor/> : <Login setToken={setToken}/>}
    </div>
  );
}

export default App;
