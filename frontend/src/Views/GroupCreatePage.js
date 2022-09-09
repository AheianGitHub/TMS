import React, { useState } from "react";
import "../Table.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [groupname, setGroupName] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!groupname) {
      console.log(groupname);
      toast.warning("No group name set.", {
        hideProgressBar: true
      });
    } else {
      return fetch("/CreateGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        // POST content
        body: JSON.stringify({
          groupname: groupname
        })
      }).then(async res => {
        if (res.status === 200) {
          toast.success("Group Creation Successful!", {
            hideProgressBar: true
          });

          e.target.reset();
          setGroupName();
        } else {
          // Unpack error message
          const err_msg = await res.json();
          // Duplicate error message
          if (err_msg.duplicate === true) {
            toast.error("Group already exists.", { hideProgressBar: true });
          }
          // Not duplicate error message
          else {
            toast.error("Unsuccessful Group Creation..", {
              hideProgressBar: true
            });
          }
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Groupname</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">
                    <input
                      onChange={e => setGroupName(e.target.value.trim())}
                      name="vanish"
                      type="text"
                      placeholder="Groupname Input"
                      autoComplete="off"
                    />
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>
                    <button type="submit" className="spaceBetweenButtons">
                      Create
                    </button>
                  </td>
                  <td>
                    <a
                      href="/GroupManagementPage"
                      className="spaceBetweenButtons"
                    >
                      Return to Previous Page
                    </a>
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

export default CreateGroup;
