import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import GetGroups from "../Components/GetGroups";
import PreSelect from "../Components/PreSelect";
import SplitMultiselect from "../Components/SplitMultiselect";
import CheckEmailField from "../Components/CheckEmailField";
import CheckPasswordField from "../Components/CheckPasswordField";

function UserEditPage(individualData) {
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(
    JSON.parse(sessionStorage.getItem("UserData")).email
  );
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [preSelectedGroups, setPreSelectedGroups] = useState([]);

  useEffect(() => {
    GetGroups(setGroupOptions);
    let existing_groups = PreSelect(tempGroupname);
    setPreSelectedGroups(existing_groups);
    setSelectedGroups(existing_groups);
  }, []);

  let username = JSON.parse(sessionStorage.getItem("UserData")).username;
  let tempEmail = JSON.parse(sessionStorage.getItem("UserData")).email;
  let tempGroupname = JSON.parse(sessionStorage.getItem("UserData")).groupname;
  let status = JSON.parse(sessionStorage.getItem("UserData")).status;

  const handleUserEditSave = async e => {
    e.preventDefault();

    if (
      !password &&
      tempEmail === email &&
      selectedGroups === preSelectedGroups
    ) {
      toast.error("No new information to edit.", {
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

    return fetch("/EditUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        groupname: SplitMultiselect(selectedGroups)
      })
    }).then(res => {
      if (res.status === 200) {
        toast.success("Profile Update Successful!", { hideProgressBar: true });
        e.target.reset();
        setPassword();
        setEmail();

        setTimeout(() => {
          navigate("/UserManagementPage");
          sessionStorage.removeItem("UserData");
        }, 2000);
      } else {
        toast.error("Profile Update Failure..", { hideProgressBar: true });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div>
          <form onSubmit={handleUserEditSave}>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Group Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">{username}</td>
                  <td key="uniqueID2">
                    <input
                      name="vanish"
                      type="password"
                      placeholder="Password Input"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                  </td>
                  <td key="uniqueID3">
                    <input
                      name="vanish"
                      type="text"
                      placeholder={tempEmail}
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                    />
                  </td>
                  <td key="uniqueID4">
                    <div>
                      <Multiselect
                        placeholder="Select Group(s)"
                        displayValue="groupname"
                        onRemove={selection => {
                          setSelectedGroups(selection);
                        }}
                        onSelect={selection => {
                          setSelectedGroups(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={preSelectedGroups}
                      />
                    </div>
                  </td>
                  <td key="uniqueID5">{status ? "Active" : "Inactive"}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="/UserManagementPage"
                      className="spaceBetweenButtons"
                    >
                      Return to Previous Page
                    </a>
                  </td>
                  <td>
                    <button type="submit" className="spaceBetweenButtons">
                      Save
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

export default UserEditPage;
