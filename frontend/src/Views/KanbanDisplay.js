import { useState, useEffect } from "react";
import GetAllPlans from "../Components/DisplayAllPlans";
import GetTasks from "../Components/GetTasks";

import StateOpen_ToDoList from "../Components/StateOpen_ToDoList";
import StateToDoList_Doing from "../Components/StateToDoList_Doing";
import StateDoing_ToDoList from "../Components/StateDoing_ToDoList";
import StateDoing_Done from "../Components/StateDoing_Done";
import StateDone_Doing from "../Components/StateDone_Doing";
import StateDone_Closed from "../Components/StateDone_Closed";
import StateAuditTrail from "../Components/StateAuditTrail";

import CheckGroup from "../Components/CheckGroup";
import SendMail from "../Components/SendMail";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

  let Task_currentDate = new Date();

  let removeFrontChar = Task_currentDate.toString().slice(4);
  // console.log("Removing the day", removeFrontChar);

  let removeBackChar = removeFrontChar
    .toString()
    .slice(0, removeFrontChar.length - 35);

  const token = JSON.parse(sessionStorage.getItem("token")).token;

  const [planTableData, setPlanTableData] = useState([]);
  const [taskTableData, setTaskTableData] = useState([]);
  const [PM, setPM] = useState();

  const [pCreate, setPCreate] = useState();
  const [pOpen, setPOpen] = useState();
  const [pToDoList, setPToDoList] = useState();
  const [pDoing, setPDoing] = useState();
  const [pDone, setPDone] = useState();

  // Mounting useeffect
  useEffect(() => {
    const InitPage = async () => {
      // Setting all permissions
      // Plan permission
      setPM(await CheckGroup(token.username, "Project Manager"));
      // Task permissions
      setPCreate(await CheckGroup(token.username, App_permit_Create));
      setPOpen(await CheckGroup(token.username, App_permit_Open));
      setPToDoList(await CheckGroup(token.username, App_permit_toDoList));
      setPDoing(await CheckGroup(token.username, App_permit_Doing));
      setPDone(await CheckGroup(token.username, App_permit_Done));
    };
    InitPage();
  }, []);

  // Update useffect
  useEffect(() => {
    GetAllPlans(setPlanTableData);
    GetTasks(setTaskTableData, App_Acronym);
  }, [taskTableData]);

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
                  {PM === true && <a href="/PlanCreatePage">Create Plan</a>}
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
                        {PM === true && (
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
                        )}
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
        {pCreate === true && <a href="/TaskCreatePage">Create Task</a>}
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
          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              {taskTableData &&
                taskTableData.map(individualData => {
                  // console.log(individualData);
                  if (individualData.Task_state === "Open") {
                    return (
                      <tr key={individualData.Task_name}>
                        <td
                          key="uniqueID1"
                          className="tooltip"
                          style={{
                            // borderColor: individualData.Task_colour,
                            borderWidth: "2px"
                          }}
                        >
                          {pOpen === true && (
                            <ArrowForwardIcon
                              // value="check"
                              // selected={individualData.status}
                              onClick={() => {
                                StateOpen_ToDoList(individualData.Task_name);
                                individualData.Task_notes =
                                  token.username +
                                  " changed Task State: Open -> To-Do-List (Owner: " +
                                  token.username +
                                  ", Current state: To-Do-List, Timestamp: " +
                                  removeBackChar +
                                  ")." +
                                  "\n \n" +
                                  individualData.Task_notes;
                                StateAuditTrail(
                                  individualData.Task_name,
                                  individualData.Task_notes
                                );
                              }}
                            />
                          )}

                          {individualData.Task_name}
                          <span className="tooltiptext">
                            Task Description: {individualData.Task_description},{" "}
                            <br></br>
                            Task Notes: {individualData.Task_notes}, <br></br>
                            Task ID: {individualData.Task_id}, <br></br>
                            Task Plan: {individualData.Task_plan}, <br></br>
                            Task App Acronym: {
                              individualData.Task_app_Acronym
                            }, <br></br>
                            Task State: {individualData.Task_state},<br></br>
                            Task Creator: {individualData.Task_creator},{" "}
                            <br></br>
                            Task Owner: {individualData.Task_owner}, <br></br>
                            Task Created Date:{" "}
                            {new Date(individualData.Task_createDate)
                              .toLocaleDateString("pt-br")
                              .split("/")
                              .join("-")}
                            <br></br>
                          </span>
                        </td>
                        <td>
                          {pOpen === true && (
                            <a
                              onClick={() => {
                                sessionStorage.setItem(
                                  "TaskData",
                                  JSON.stringify(individualData)
                                );
                              }}
                              href="/TaskEditPage"
                              // className="spaceBetweenButtons"
                            >
                              Edit Task
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
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
            TO-DO-LIST
          </div>
          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              {taskTableData &&
                taskTableData.map(individualData => {
                  if (individualData.Task_state === "To-Do-List") {
                    return (
                      <tr key={individualData.Task_name}>
                        <td
                          key="uniqueID1"
                          className="tooltip"
                          style={{
                            // borderColor: individualData.Task_colour,
                            borderWidth: "2px"
                          }}
                        >
                          {pToDoList === true && (
                            <ArrowForwardIcon
                              // value="check"
                              // selected={individualData.status}
                              onClick={() => {
                                StateToDoList_Doing(individualData.Task_name);
                                individualData.Task_notes =
                                  token.username +
                                  " changed Task State: To-Do-List -> Doing (Owner: " +
                                  token.username +
                                  ", Current state: Doing, Timestamp: " +
                                  removeBackChar +
                                  ")." +
                                  "\n \n" +
                                  individualData.Task_notes;
                                StateAuditTrail(
                                  individualData.Task_name,
                                  individualData.Task_notes
                                );
                              }}
                            />
                          )}

                          {individualData.Task_name}
                          <span className="tooltiptext">
                            Task Description: {individualData.Task_description},{" "}
                            <br></br>
                            Task Notes: {individualData.Task_notes}, <br></br>
                            Task ID: {individualData.Task_id}, <br></br>
                            Task Plan: {individualData.Task_plan}, <br></br>
                            Task App Acronym: {
                              individualData.Task_app_Acronym
                            }, <br></br>
                            Task State: {individualData.Task_state},<br></br>
                            Task Creator: {individualData.Task_creator},{" "}
                            <br></br>
                            Task Owner: {individualData.Task_owner}, <br></br>
                            Task Created Date:{" "}
                            {new Date(individualData.Task_createDate)
                              .toLocaleDateString("pt-br")
                              .split("/")
                              .join("-")}
                            <br></br>
                          </span>
                        </td>
                        <td>
                          {pToDoList === true && (
                            <a
                              onClick={() => {
                                sessionStorage.setItem(
                                  "TaskData",
                                  JSON.stringify(individualData)
                                );
                              }}
                              href="/TaskEditPage"
                              // className="spaceBetweenButtons"
                            >
                              Edit Task
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
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
          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              {taskTableData &&
                taskTableData.map(individualData => {
                  if (individualData.Task_state === "Doing") {
                    return (
                      <tr key={individualData.Task_name}>
                        <td
                          key="uniqueID1"
                          className="tooltip"
                          style={{
                            // borderColor: individualData.Task_colour,
                            borderWidth: "2px"
                          }}
                        >
                          {pDoing === true && (
                            <ArrowForwardIcon
                              // value="check"
                              // selected={individualData.status}
                              onClick={() => {
                                StateDoing_Done(individualData.Task_name);
                                SendMail(
                                  token.username,
                                  individualData.Task_name
                                );
                                individualData.Task_notes =
                                  token.username +
                                  " changed Task State: Doing -> Done (Owner: " +
                                  token.username +
                                  ", Current state: Done, Timestamp: " +
                                  removeBackChar +
                                  ")." +
                                  "\n \n" +
                                  individualData.Task_notes;
                                StateAuditTrail(
                                  individualData.Task_name,
                                  individualData.Task_notes
                                );
                              }}
                            />
                          )}
                          ===
                          {pDoing === true && (
                            <ArrowBackIcon
                              // value="check"
                              // selected={individualData.status}
                              onClick={() => {
                                StateDoing_ToDoList(individualData.Task_name);
                                individualData.Task_notes =
                                  token.username +
                                  " changed Task State: Doing -> To-Do-List (Owner: " +
                                  token.username +
                                  ", Current state: To-Do-List, Timestamp: " +
                                  removeBackChar +
                                  ")." +
                                  "\n \n" +
                                  individualData.Task_notes;
                                StateAuditTrail(
                                  individualData.Task_name,
                                  individualData.Task_notes
                                );
                              }}
                            />
                          )}
                          {individualData.Task_name}
                          <span className="tooltiptext">
                            Task Description: {individualData.Task_description},{" "}
                            <br></br>
                            Task Notes: {individualData.Task_notes}, <br></br>
                            Task ID: {individualData.Task_id}, <br></br>
                            Task Plan: {individualData.Task_plan}, <br></br>
                            Task App Acronym: {
                              individualData.Task_app_Acronym
                            }, <br></br>
                            Task State: {individualData.Task_state},<br></br>
                            Task Creator: {individualData.Task_creator},{" "}
                            <br></br>
                            Task Owner: {individualData.Task_owner}, <br></br>
                            Task Created Date:{" "}
                            {new Date(individualData.Task_createDate)
                              .toLocaleDateString("pt-br")
                              .split("/")
                              .join("-")}
                            <br></br>
                          </span>
                        </td>
                        <td>
                          {pDoing === true && (
                            <a
                              onClick={() => {
                                sessionStorage.setItem(
                                  "TaskData",
                                  JSON.stringify(individualData)
                                );
                              }}
                              href="/TaskEditPage"
                              // className="spaceBetweenButtons"
                            >
                              Edit Task
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
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
          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              {taskTableData &&
                taskTableData.map(individualData => {
                  if (individualData.Task_state === "Done") {
                    return (
                      <tr key={individualData.Task_name}>
                        <td
                          key="uniqueID1"
                          className="tooltip"
                          style={{
                            // borderColor: individualData.Task_colour,
                            borderWidth: "2px"
                          }}
                        >
                          {pDone === true && (
                            <ArrowForwardIcon
                              // value="check"
                              // selected={individualData.status}
                              onClick={() => {
                                StateDone_Closed(individualData.Task_name);
                                individualData.Task_notes =
                                  token.username +
                                  " changed Task State: Done -> Closed (Owner: " +
                                  token.username +
                                  ", Current state: Closed, Timestamp: " +
                                  removeBackChar +
                                  ")." +
                                  "\n \n" +
                                  individualData.Task_notes;
                                StateAuditTrail(
                                  individualData.Task_name,
                                  individualData.Task_notes
                                );
                              }}
                            />
                          )}
                          ===
                          {pDone === true && (
                            <ArrowBackIcon
                              // value="check"
                              // selected={individualData.status}
                              onClick={() => {
                                StateDone_Doing(individualData.Task_name);
                                individualData.Task_notes =
                                  token.username +
                                  " changed Task State: Done -> Doing (Owner: " +
                                  token.username +
                                  ", Current state: Doing, Timestamp: " +
                                  removeBackChar +
                                  ")." +
                                  "\n \n" +
                                  individualData.Task_notes;
                                StateAuditTrail(
                                  individualData.Task_name,
                                  individualData.Task_notes
                                );
                              }}
                            />
                          )}
                          {individualData.Task_name}
                          <span className="tooltiptext">
                            Task Description: {individualData.Task_description},{" "}
                            <br></br>
                            Task Notes: {individualData.Task_notes}, <br></br>
                            Task ID: {individualData.Task_id}, <br></br>
                            Task Plan: {individualData.Task_plan}, <br></br>
                            Task App Acronym: {
                              individualData.Task_app_Acronym
                            }, <br></br>
                            Task State: {individualData.Task_state},<br></br>
                            Task Creator: {individualData.Task_creator},{" "}
                            <br></br>
                            Task Owner: {individualData.Task_owner}, <br></br>
                            Task Created Date:{" "}
                            {new Date(individualData.Task_createDate)
                              .toLocaleDateString("pt-br")
                              .split("/")
                              .join("-")}
                            <br></br>
                          </span>
                        </td>
                        <td>
                          {pDone === true && (
                            <a
                              onClick={() => {
                                sessionStorage.setItem(
                                  "TaskData",
                                  JSON.stringify(individualData)
                                );
                              }}
                              href="/TaskEditPage"
                              // className="spaceBetweenButtons"
                            >
                              Edit Task
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
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
          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              {taskTableData &&
                taskTableData.map(individualData => {
                  if (individualData.Task_state === "Closed") {
                    return (
                      <tr key={individualData.Task_name}>
                        <td
                          key="uniqueID1"
                          className="tooltip"
                          style={{
                            // borderColor: individualData.Task_colour,
                            borderWidth: "2px"
                          }}
                        >
                          {individualData.Task_name}
                          <span className="tooltiptext">
                            Task Description: {individualData.Task_description},{" "}
                            <br></br>
                            Task Notes: {individualData.Task_notes}, <br></br>
                            Task ID: {individualData.Task_id}, <br></br>
                            Task Plan: {individualData.Task_plan}, <br></br>
                            Task App Acronym: {
                              individualData.Task_app_Acronym
                            }, <br></br>
                            Task State: {individualData.Task_state},<br></br>
                            Task Creator: {individualData.Task_creator},{" "}
                            <br></br>
                            Task Owner: {individualData.Task_owner}, <br></br>
                            Task Created Date:{" "}
                            {new Date(individualData.Task_createDate)
                              .toLocaleDateString("pt-br")
                              .split("/")
                              .join("-")}
                            <br></br>
                          </span>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default KanbanDisplay;
