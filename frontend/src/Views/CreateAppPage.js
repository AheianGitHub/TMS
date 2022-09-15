import React, { useState, useEffect } from "react";
import "../Table.css";
import { useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import GetGroups from "../Components/GetGroups";
import SplitMultiselect from "../Components/SplitMultiselect";
import CheckEmailField from "../Components/CheckEmailField";
import CheckPasswordField from "../Components/CheckPasswordField";

function CreateAppPage() {
  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    GetGroups(setGroupOptions);
    navigate("/CreateAppPage");
  }, []);

  // const handleSubmit = async e => {
  //   e.preventDefault();

  //   const splitted_group = SplitMultiselect(selectedGroups);

  //   if (!username && !password && !email && !selectedGroups) {
  //     toast.error("None of the fields have an input.", {
  //       hideProgressBar: true
  //     });
  //     return;
  //   }

  //   if (!username) {
  //     toast.warning("No username set.", {
  //       hideProgressBar: true
  //     });
  //     return;
  //   }

  //   if (!password) {
  //     toast.warning("No password set.", {
  //       hideProgressBar: true
  //     });
  //     return;
  //   }

  //   // Missing inputs
  //   if (password && !CheckPasswordField(password)) {
  //     return;
  //   }

  //   if (email && !CheckEmailField(email)) {
  //     return;
  //   }

  //   // console.log("???");
  //   // console.log(groupname);

  //   return fetch("/CreateUser", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     // POST content
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //       email: email,
  //       groupname: splitted_group
  //     })
  //   }).then(async res => {
  //     if (res.status === 200) {
  //       toast.success("User created successfully!", { hideProgressBar: true });
  //       e.target.reset();
  //       setUserName();
  //       setPassword();
  //       setEmail();
  //       setSelectedGroups();
  //     } else {
  //       // Unpack error message
  //       const err_msg = await res.json();
  //       // Duplicate error message
  //       if (err_msg.duplicate === true) {
  //         toast.error("Username is taken, please use another username.", {
  //           hideProgressBar: true
  //         });
  //       }
  //       // Not duplicate error message
  //       else {
  //         toast.error("Profile Update Failure..", {
  //           hideProgressBar: true
  //         });
  //       }
  //     }
  //   });
  // };

  return (
    <>
      <div className="container">
        <div>
          {/* <form onSubmit={handleSubmit}> */}
          <table>
            <thead>
              <tr>
                <th>App_Acronym</th>
                <th>App_Description</th>
                <th>App_startDate</th>
                <th>App_endDate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td key="uniqueID1">
                  <input
                    onChange={e => setUserName(e.target.value.trim())}
                    name="vanish"
                    type="text"
                    placeholder="Username Input"
                    autoComplete="off"
                  />
                </td>
                <td key="uniqueID2">
                  <input
                    onChange={e => setPassword(e.target.value)}
                    name="vanish"
                    type="text"
                    size="256"
                    placeholder="Password Input"
                    autoComplete="off"
                  />
                </td>
                <td key="uniqueID3">
                  <input
                    onChange={e => setEmail(e.target.value)}
                    name="vanish"
                    type="text"
                    placeholder="Email Input"
                    autoComplete="off"
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
                      selectedValues={selectedGroups}
                    />
                  </div>
                </td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th>App_permit_Open</th>
                <th>App_permit_toDoList</th>
                <th>App_permit_Doing</th>
                <th>App_permit_Done</th>
                <th>App_permit_Create</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <a
                    href="/TaskManagementSystemPage"
                    className="spaceBetweenButtons"
                  >
                    Return to Previous Page
                  </a>
                </td>
                <td>
                  <button type="submit" className="spaceBetweenButtons">
                    Create
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default CreateAppPage;
