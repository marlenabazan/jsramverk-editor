import { useState } from "react";

import Editor from "./components/editor";
import Login from "./components/login";
import Header from "./components/header";

function App() {
  const [token, setToken] = useState("");
  console.log("Token: ", token);
  const [userEmail, setUserEmail] = useState(null);

  function handleLogout() {
    setToken(null);
    setUserEmail(null);
  }

  function handleLogin(token, userEmail) {
    setToken(token);
    setUserEmail(userEmail);
  }

  return (
    <div>
        {token ? (
          <div>
            <Header userEmail={userEmail} setToken={setToken}/>
            <Editor token={token} userEmail={userEmail} />
          </div>
      ) : (
        <Login onLogin={handleLogin} setToken={setToken} setUserEmail={setUserEmail}/>
      )}
    </div>
  );
}

export default App;
