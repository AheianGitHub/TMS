import { useState, useEffect } from "react";
import GetAllPlans from "../Components/DisplayAllPlans";
import "../Table.css";

function KanbanDisplay() {
  let App_Acronym = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Acronym;
  let App_Description = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Description;
  let App_Rnumber = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Rnumber;
  let App_startDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_startDate;
  let App_endDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_endDate;
  let App_permit_Create = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_permit_Create;
  let App_permit_Open = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_permit_Open;
  let App_permit_toDoList = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_permit_toDoList;
  let App_permit_Doing = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_permit_Doing;
  let App_permit_Done = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_permit_Done;

  const [planTableData, setPlanTableData] = useState([]);

  useEffect(() => {
    GetAllPlans(setPlanTableData);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "solid",
          padding: "5px",
          fontSize: "11px"
        }}
      >
        {/* ===========================Application Section====================================================== */}
        <div
          style={{
            width: "50%",
            textAlign: "center",
            border: "solid"
          }}
        >
          <table style={{ width: "100%", height: "100%" }}>
            <thead>
              <tr>
                <td>App_Acronym:</td>
                <td key="uniqueID1">{App_Acronym}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Application Details:</td>
                <td key="uniqueID2" className="tooltip">
                  {App_Description}
                  <span className="tooltiptext">
                    Rnumber: {App_Rnumber}, <br></br>
                    {/* Find a way to remove the time for the date value */}
                    Start Date:{" "}
                    {new Date(App_startDate)
                      .toLocaleDateString("pt-br")
                      .split("/")
                      .join("-")}
                    , <br></br>
                    End Date:{" "}
                    {new Date(App_endDate)
                      .toLocaleDateString("pt-br")
                      .split("/")
                      .join("-")}
                    , <br></br>
                    App Permit Open: {App_permit_Open}, <br></br>
                    App Permit To-Do-List: {App_permit_toDoList}, <br></br>
                    App Permit Doing: {App_permit_Doing}, <br></br>
                    App Permit Done: {App_permit_Done}, <br></br>
                    App Permit Create: {App_permit_Create}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===========================Plan Section====================================================== */}

        <div
          style={{
            width: "50%",
            textAlign: "center",
            border: "solid"
          }}
        >
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Plan_MVP_name</th>
                <th>
                  <a href="/PlanCreatePage">Create Plan</a>
                </th>
              </tr>
            </thead>
            <tbody>
              {planTableData.map(individualData => {
                if (individualData.Plan_app_Acronym === App_Acronym) {
                  return (
                    <tr key={individualData.Plan_MVP_name}>
                      <td
                        key="uniqueID1"
                        className="tooltip"
                        style={{
                          borderColor: individualData.Plan_Colour,
                          borderWidth: "2px"
                        }}
                      >
                        {individualData.Plan_MVP_name}
                        <span className="tooltiptext">
                          Start Date: {""}
                          {new Date(individualData.Plan_startDate)
                            .toLocaleDateString("pt-br")
                            .split("/")
                            .join("-")}
                          ,<br></br>
                          End Date: {""}
                          {new Date(individualData.Plan_endDate)
                            .toLocaleDateString("pt-br")
                            .split("/")
                            .join("-")}
                          , <br></br>
                          App_Acronym: {individualData.Plan_app_Acronym}
                        </span>
                      </td>
                      <td>
                        <a
                          onClick={() => {
                            sessionStorage.setItem(
                              "PlanData",
                              JSON.stringify(individualData)
                            );
                          }}
                          href="/PlanEditPage"
                          // className="spaceBetweenButtons"
                        >
                          Edit Plan
                        </a>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================Task Section====================================================== */}

      <div
        style={{
          width: "100%",
          textAlign: "center",
          border: "solid"
        }}
      >
        <a href="/TaskCreatePage">Create Task</a>
        &ensp;
        <a href="/TaskEditPage">Edit Task</a>
      </div>

      {/* ===========================KanBan Board====================================================== */}
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
    </>
  );
}

export default KanbanDisplay;
