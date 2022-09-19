import React, { useState } from "react";
import "../Table.css";
import CheckEmailField from "../Components/CheckEmailField";
import CheckPasswordField from "../Components/CheckPasswordField";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfileEditPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token")).token;

  let tempEmail = JSON.parse(sessionStorage.getItem("UserData"));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password && !email) {
      toast.error("No password or email set.", {
        hideProgressBar: true
      });
      return;
    }

    // Missing inputs
    if (email && !CheckEmailField(email)) {
      return;
    }

    if (password && !CheckPasswordField(password)) {
      return;
    }

    return fetch("/EditProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        username: token.username,
        password: password,
        email: email
      })
    }).then(res => {
      if (res.status === 200) {
        toast.success("Profile Update Successful!", { hideProgressBar: true });
        e.target.reset();
        setPassword();
        setEmail();
        sessionStorage.removeItem("UserData");
        setTimeout(() => {
          navigate("/ProfilePage");
        }, 1500);
      } else {
        toast.error("Profile Update Failure..", { hideProgressBar: true });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Password</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">
                    <input
                      onChange={event => setPassword(event.target.value)}
                      name="vanish"
                      type="password"
                      placeholder="Password Input"
                      value={password}
                    />
                  </td>
                  <td key="uniqueID2">
                    <input
                      onChange={event => setEmail(event.target.value)}
                      name="vanish"
                      type="text"
                      placeholder={tempEmail}
                      value={email}
                    />
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>
                    <a href="/ProfilePage" className="spaceBetweenButtons">
                      Return to Previous Page
                    </a>
                  </td>
                  <td>
                    <button type="submit" className="spaceBetweenButtons">
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileEditPage;
