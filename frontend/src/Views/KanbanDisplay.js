import { useState, useEffect } from "react";
import GetAllApplications from "../Components/DisplayAllApplications";
import "../Table.css";

function KanbanDisplay() {
  const [appTableData, setAppTableData] = useState([]);

  useEffect(() => {
    GetAllApplications(setAppTableData);
    // GetAllPlans(setPlanTableData);
  }, []);

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>
                <a href="/PlanCreatePage">Create Plan</a>
                <br></br>
                <a href="/PlanEditPage">Edit Plan</a>
              </th>
            </tr>
          </thead>
          <tbody>
            {appTableData.map(individualData => {
              return (
                <tr key={individualData.App_Acronym}>
                  <td key="uniqueID1">
                    <a
                      // onClick={() => {
                      //   sessionStorage.setItem(
                      //     "ApplicationData",
                      //     JSON.stringify(individualData)
                      //   );
                      // }}
                      href="/KanbanDisplay"
                      className="spaceBetweenButtons"
                    >
                      {individualData.App_Acronym}
                    </a>
                  </td>
                  <td key="uniqueID2" className="tooltip">
                    {individualData.App_Description}
                    <span className="tooltiptext">
                      Rnumber: {individualData.App_Rnumber}, <br></br>
                      {/* Find a way to remove the time for the date value */}
                      Start Date: {individualData.App_startDate}, <br></br>
                      End Date: {individualData.App_endDate}, <br></br>
                      App Permit Open: {individualData.App_permit_Open},{" "}
                      <br></br>
                      App Permit To-Do-List:{" "}
                      {individualData.App_permit_toDoList}, <br></br>
                      App Permit Doing: {individualData.App_permit_Doing},{" "}
                      <br></br>
                      App Permit Done: {individualData.App_permit_Done},{" "}
                      <br></br>
                      App Permit Create: {individualData.App_permit_Create}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: "solid",
            padding: "5px",
            fontSize: "11px"
          }}
        >
          <div
            id="open"
            style={{
              width: "20%",
              textAlign: "center",
              border: "solid"
            }}
          >
            <div
              style={{
                borderBottom: "solid",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              OPEN
            </div>
            <br />
            ADD MAP Here
          </div>

          <div
            id="todolist"
            style={{
              width: "20%",
              textAlign: "center",
              borderTop: "solid",
              borderRight: "solid",
              borderBottom: "solid"
            }}
          >
            <div
              style={{
                borderBottom: "solid",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              TO DO LIST
            </div>
            <br />
            ADD MAP Here
          </div>

          <div
            id="doing"
            style={{
              width: "20%",
              textAlign: "center",
              borderTop: "solid",
              borderRight: "solid",
              borderBottom: "solid"
            }}
          >
            <div
              style={{
                borderBottom: "solid",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              DOING
            </div>
            <br />
            ADD MAP Here
          </div>

          <div
            id="done"
            style={{
              width: "20%",
              textAlign: "center",
              borderTop: "solid",
              borderRight: "solid",
              borderBottom: "solid"
            }}
          >
            <div
              style={{
                borderBottom: "solid",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              DONE
            </div>
            <br />
            ADD MAP Here
          </div>

          <div
            id="closed"
            style={{
              width: "20%",
              textAlign: "center",
              borderTop: "solid",
              borderRight: "solid",
              borderBottom: "solid"
            }}
          >
            <div
              style={{
                borderBottom: "solid",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              CLOSED
            </div>
            <br />
            ADD MAP Here
          </div>
        </div>
      </div>
    </>
  );
}

export default KanbanDisplay;
