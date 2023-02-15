import { useState } from "react";

import Editor from "./components/editor";
import Login from "./components/login";

function App() {
  const [token, setToken] = useState("");
  console.log("Token: ", token);
  const [userEmail, setUserEmail] = useState(null);

  function handleLogout() {
    setToken(null);
    setUserEmail(null);
  }

  function handleLogin(token, userEmail) {
    console.log("handleLogin");
    setToken(token);
    setUserEmail(userEmail);
  }

  return (
    <div>
        {/* <Editor/> */}

        {/* {token ? <Editor/> : <Login setToken={setToken}/>} */}
        {token ? (
        <Editor token={token} userEmail={userEmail} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} setToken={setToken} setUserEmail={setUserEmail}/>
      )}
    </div>
  );
}

export default App;
