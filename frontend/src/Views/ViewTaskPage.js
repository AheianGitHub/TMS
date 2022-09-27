import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import GetPlanTaskCreate from "../Components/GetPlanTaskCreate";
// import GetPlanColour from "../Components/GetPlanColour";
import CheckGroup from "../Components/CheckGroup";
import SplitMultiselect from "../Components/SplitMultiselect";

import "../Table.css";

function ViewTaskPage() {
  let Task_name = JSON.parse(sessionStorage.getItem("TaskData")).Task_name;

  let Task_description = JSON.parse(
    sessionStorage.getItem("TaskData")
  ).Task_description;

  let Task_plan = JSON.parse(sessionStorage.getItem("TaskData")).Task_plan;

  let Task_notes = JSON.parse(sessionStorage.getItem("TaskData")).Task_notes;

  let Task_id = JSON.parse(sessionStorage.getItem("TaskData")).Task_id;

  let Task_app_Acronym = JSON.parse(
    sessionStorage.getItem("TaskData")
  ).Task_app_Acronym;

  let Task_state = JSON.parse(sessionStorage.getItem("TaskData")).Task_state;

  let Task_creator = JSON.parse(
    sessionStorage.getItem("TaskData")
  ).Task_creator;

  let Task_owner = JSON.parse(sessionStorage.getItem("TaskData")).Task_owner;
  let Current_User = JSON.parse(sessionStorage.getItem("token")).token.username;

  let Task_createDate = JSON.parse(
    sessionStorage.getItem("TaskData")
  ).Task_createDate;

  let Task_currentDate = new Date();

  let removeFrontChar = Task_currentDate.toString().slice(4);
  // console.log("Removing the day", removeFrontChar);

  let removeBackChar = removeFrontChar
    .toString()
    .slice(0, removeFrontChar.length - 35);
  // console.log("Removing the GMT etc: ", removeBackChar);

  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__

  const [taskDescription, setTaskDescription] = useState(Task_description);
  const [taskPlan, setTaskPlan] = useState([]);
  const [userMessage, setUserMessage] = useState();
  // const [Task_colour, setTask_colour] = useState();

  const [planOptions, setPlanOptions] = useState([]);
  const [taskDataHolder, settaskDataHolder] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("token")).token;
  const [PM, setPM] = useState();

  let task_Notes = "";
  if (!userMessage) {
    task_Notes = Task_notes;
  } else {
    task_Notes =
      Current_User +
      " added note: " +
      userMessage +
      " (Owner: " +
      Task_owner +
      ", Current state: " +
      Task_state +
      ", Timestamp: " +
      removeBackChar +
      ")." +
      "\n \n" +
      Task_notes;
  }

  useEffect(() => {
    if (Task_plan != null) {
      setTaskPlan([{ Plan_MVP_name: Task_plan }]);
    }
    GetPlanTaskCreate(setPlanOptions, Task_app_Acronym);
    navigate("/ViewTaskPage");

    const InitPage = async () => {
      // Setting all permissions
      // Plan permission
      setPM(await CheckGroup(token.username, "Project Manager"));
      // Task permissions
    };
    InitPage();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      Task_plan === SplitMultiselect(taskPlan, "Plan_MVP_name") &&
      taskDescription === Task_description &&
      task_Notes === Task_notes
    ) {
      toast.warning(
        "No change recorded, input changes before task can be edited.",
        {
          hideProgressBar: true
        }
      );
      return;
    }

    if (Task_plan != SplitMultiselect(taskPlan, "Plan_MVP_name")) {
      task_Notes =
        Current_User +
        " attached " +
        Task_name +
        " to plan: " +
        SplitMultiselect(taskPlan, "Plan_MVP_name") +
        " (Owner: " +
        Task_owner +
        ", Current state: " +
        Task_state +
        ", Timestamp: " +
        removeBackChar +
        ")." +
        "\n \n" +
        task_Notes;
    }

    return fetch("/EditTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        Task_name: Task_name,
        Task_description: taskDescription,
        Task_notes: task_Notes,
        Task_id: Task_id,
        Task_plan: SplitMultiselect(taskPlan, "Plan_MVP_name"),
        Task_app_Acronym: Task_app_Acronym,
        Task_state: Task_state,
        Task_creator: Task_creator,
        Task_owner: Task_owner,
        Task_createDate: Task_createDate
      })
    }).then(async res => {
      if (res.status === 200) {
        toast.success("Task Edited Successfully!", {
          hideProgressBar: true
        });

        const TaskData = {
          Task_name: Task_name,
          Task_description: taskDescription,
          Task_notes: task_Notes,
          Task_id: Task_id,
          Task_plan: SplitMultiselect(taskPlan, "Plan_MVP_name"),
          Task_app_Acronym: Task_app_Acronym,
          Task_state: Task_state,
          Task_creator: Task_creator,
          Task_owner: Task_owner,
          Task_createDate: Task_createDate
        };

        settaskDataHolder(TaskData);

        sessionStorage.setItem("TaskData", JSON.stringify(TaskData));

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to edit task..", {
          hideProgressBar: true
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Task_name</th>
                  <th>Task_app_Acronym</th>
                  <th>Task_id</th>
                  <th>Task_state</th>
                  <th>Task_creator</th>
                  <th>Task_owner</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td key="uniqueID1">{Task_name}</td>
                  <td key="uniqueID2">{Task_app_Acronym}</td>
                  <td key="uniqueID3">{Task_id}</td>
                  <td key="uniqueID4">{Task_state}</td>
                  <td key="uniqueID5">{Task_creator}</td>
                  <td key="uniqueID6">{Task_owner}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Task_plan</th>
                </tr>
                <tr>
                  <td key="uniqueID7">
                    <div>
                      {PM === true ? (
                        <Multiselect
                          placeholder="Select Plan to assign"
                          displayValue="Plan_MVP_name"
                          onRemove={selection => {
                            setTaskPlan(selection);
                          }}
                          onSelect={selection => {
                            setTaskPlan(selection);
                          }}
                          options={planOptions}
                          showCheckbox
                          selectedValues={taskPlan}
                          selectionLimit={1}
                        />
                      ) : (
                        <div>{Task_plan}</div>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>Task_description</th>
                  <th>Task_notes</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td key="uniqueID7">
                    <textarea
                      onChange={e => setTaskDescription(e.target.value)}
                      placeholder={taskDescription}
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID8">
                    <textarea
                      readOnly
                      placeholder={Task_notes}
                      autoComplete="off"
                    />
                    <textarea
                      onChange={e => setUserMessage(e.target.value)}
                      placeholder="Input Task Notes here"
                      autoComplete="off"
                    />
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>
                    <a
                      href="/KanbanDisplay"
                      className="spaceBetweenButtons"
                      // onClick={sessionStorage.removeItem("PlanData")}
                    >
                      Return to Previous Page
                    </a>
                  </td>
                  <td>
                    <button type="submit" className="spaceBetweenButtons">
                      Edit
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

export default ViewTaskPage;
