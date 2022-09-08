import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginComponents from "../Components/LoginComponents";
import "../Input.css";
import LoginHeader from "./LoginHeader";

function LoginPage({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    // Missing inputs
    if (!LoginComponents.LoginInputCheck(username, password)) {
      return;
    }
    // Login backend and store user token if successful
    const token = await LoginComponents.LoginUser(username, password);
    setToken(token);
    // // Reset the fields after successful authentication
    // setUsername();
    // setPassword();
  };

  return (
    <>
      <LoginHeader />
      {/* HTML  Files that will be Displayed */}
      <div className="body">
        <div>
          <form onSubmit={handleSubmit}>
            <p className="wordsize">Username </p>
            <input
              onChange={e => setUsername(e.target.value)}
              name="vanish"
              type="text"
              placeholder="Username Input"
              autoComplete="off"
              className="input"
            />
            <p className="wordsize"> Password </p>
            <input
              onChange={e => setPassword(e.target.value)}
              name="vanish"
              type="password"
              placeholder="Password Input"
              autoComplete="off"
              className="input"
            />
            <p>
              <button className="button" type="submit">
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage; //second
