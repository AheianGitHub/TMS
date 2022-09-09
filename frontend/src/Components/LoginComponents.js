import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginInputCheck(username, password) {
  // Missing username and password
  if (!username && !password) {
    toast.warning(
      "Both fields are empty, please input username and password.",
      {
        hideProgressBar: true
      }
    );
    return false;
  }
  if (!username && password) {
    toast.warning("Please input username", { hideProgressBar: true });
    return false;
  }
  if (username && !password) {
    toast.warning("Please input password", { hideProgressBar: true });
    return false;
  }
  return true;
}

async function LoginUser(username, password) {
  // let sessionID;
  return fetch("/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // POST content
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(async res => await res.json())
    .then(ifNegative => {
      if (ifNegative.message == "Disabled") {
        toast.error("User is disabled.", { hideProgressBar: true });
      } else if (ifNegative.message == "Incorrect") {
        toast.error("Invalid username or password", { hideProgressBar: true });
      } else {
        return ifNegative;
      }
    });
}

const LoginComponents = {
  LoginInputCheck,
  LoginUser
};

export default LoginComponents;
