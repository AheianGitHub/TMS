import { useState, useEffect } from "react";
import GetGroups from "../Components/GetGroups";

function GroupManagementPage() {
  const [groupTableData, setGroupTableData] = useState([]);

  useEffect(() => {
    GetGroups(setGroupTableData);
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <table>
            <thead>
              <tr>
                <th>Group Name</th>
                <td>
                  <a href="/GroupCreatePage" className="spaceBetweenButtons">
                    Create Group
                  </a>
                </td>
              </tr>
            </thead>

            <tbody>
              {groupTableData.map(individualData => {
                return (
                  <tr key={individualData.groupname}>
                    <td>{individualData.groupname}</td>
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

export default GroupManagementPage;
