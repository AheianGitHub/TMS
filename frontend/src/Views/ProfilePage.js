import { useState, useEffect } from "react";
import DisplayUser from "../Components/DisplayUser";
import "../Table.css";

function ProfilePage() {
  const token = JSON.parse(sessionStorage.getItem("token")).token;
  const [dataHold, setDataHold] = useState();

  useEffect(() => {
    DisplayUser(token.username, setDataHold);
  }, []);

  return (
    <>
      {dataHold && (
        <div className="container">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Group Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">{dataHold.username}</td>
                  <td key="uniqueID2">{dataHold.email}</td>
                  <td key="uniqueID3">{dataHold.groupname}</td>
                </tr>

                <tr>
                  <td>
                    <a
                      href="/ProfileEditPage"
                      className="spaceBetweenButtons"
                      onClick={() => {
                        sessionStorage.setItem(
                          "UserData",
                          JSON.stringify(dataHold.email)
                        );
                      }}
                    >
                      Edit Profile
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
