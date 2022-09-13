import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import DisplayAllUsers from "../Components/DisplayAllUsers";
import "../Table.css";

function UserManagementPage() {
  const [dataHold, setDataHold] = useState([]);

  const [statusRender, setStatusRender] = useState(false);

  useEffect(() => {
    DisplayAllUsers(setDataHold);
  }, [statusRender]);

  async function toggleStatus(status, username) {
    //e.preventDefault();

    return fetch("/ToggleStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        status: status,
        username: username
      })
    })
      .then(async res => await res.json())
      .then(json_res => {
        if (json_res.result === true) {
          if (status === true) {
            toast.success("User Status is now Active!", {
              hideProgressBar: true
            });
          } else if (status === false) {
            toast.warn("User Status is now Inactive!", {
              hideProgressBar: true
            });
          }
        }
      });
  }

  return (
    <>
      <div className="container">
        <div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Group Name</th>
                <th>Status</th>
                <th>
                  <a href="/UserCreatePage" className="spaceBetweenButtons">
                    Create User
                  </a>
                </th>
              </tr>
            </thead>

            <tbody>
              {dataHold.map(individualData => {
                return (
                  <tr key={individualData.username}>
                    <td key="uniqueID1">{individualData.username}</td>
                    <td key="uniqueID2">{individualData.email}</td>
                    <td key="uniqueID3">{individualData.groupname}</td>
                    <td key="uniqueID4">
                      <ToggleButton
                        value="check"
                        selected={individualData.status}
                        onClick={() => {
                          toggleStatus(
                            !individualData.status,
                            individualData.username
                          );
                          setStatusRender(status => !status);
                        }}
                      >
                        <CheckIcon />
                      </ToggleButton>
                      {individualData.status ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <a
                        onClick={() => {
                          sessionStorage.setItem(
                            "UserData",
                            JSON.stringify(individualData)
                          );
                        }}
                        href="/UserEditPage"
                        className="spaceBetweenButtons"
                      >
                        EDIT
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserManagementPage;
