import { useState, useEffect } from "react";
import GetAllApplications from "../Components/DisplayAllApplications";
import "../Table.css";

function TaskManagementSystemPage() {
  //Create 3 Applications in SQL
  //Display Applications in Task Management System Page(TMSP)
  //Display Application details via hover over short description text
  //Create App page -> Create like creating users, update database
  //-Return to Create App page in case of multi-create
  //-On return to TMSP, display newly created apps
  //Edit App page -> Edit app like editing users, update database
  //-Return to TMSP upon edit to reflect changes

  const [groupTableData, setGroupTableData] = useState([]);

  useEffect(() => {
    GetAllApplications(setGroupTableData);
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <table>
            <thead>
              <tr>
                <th>Application(s)</th>
                <th>Brief Description of App</th>
                <th>
                  <a
                    href="/ProjectLeadCreateApp"
                    className="spaceBetweenButtons"
                  >
                    Create App
                  </a>
                </th>
              </tr>
            </thead>

            <tbody>
              {groupTableData.map(individualData => {
                return (
                  <tr key={individualData.App_Acronym}>
                    <td key="uniqueID1">{individualData.App_Acronym}</td>
                    <td key="uniqueID2" className="tooltip">
                      {individualData.App_Description}
                      <span className="tooltiptext">
                        Rnumber: {individualData.App_Rnumber}, <br></br>
                        Start Date: {individualData.App_startDate}, <br></br>
                        End Date: {individualData.App_endDate}, <br></br>
                        App Permit Open: {individualData.App_permit_Open},{" "}
                        <br></br>
                        App Permit To-Do-List:{" "}
                        {individualData.App_permit_toDoList}, <br></br>
                        App Permit Doing: {
                          individualData.App_permit_Doing
                        }, <br></br>
                        App Permit Done: {individualData.App_permit_Done},{" "}
                        <br></br>
                        App Permit Create: {individualData.App_permit_Create}
                      </span>
                    </td>
                    <td>
                      <a
                        onClick={() => {
                          sessionStorage.setItem(
                            "ApplicationData",
                            JSON.stringify(individualData)
                          );
                        }}
                        href="/ApplicationEditPage"
                        className="spaceBetweenButtons"
                      >
                        EDIT
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* <tbody>
              {dataHold.map(individualData => {
                return (
                  <tr key={individualData.username}>
                    <td key="uniqueID1">{individualData.username}</td>
                    <td key="uniqueID2">{individualData.email}</td>
                    <td key="uniqueID3">{individualData.groupname}</td>
                    <td key="uniqueID4">
                      <ToggleButton
                        value="check"
                        selected={selected}
                        onClick={() => {
                          setSelected(!selected);
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
            </tbody> */}
          </table>
        </div>
      </div>
    </>
  );
}

export default TaskManagementSystemPage;
