import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import GetPlanTaskCreate from "../Components/GetPlanTaskCreate";
import GetPlanColour from "../Components/GetPlanColour";
import GetTasks from "../Components/GetTasks";
import SplitMultiselect from "../Components/SplitMultiselect";

import "../Table.css";

function TaskCreatePage() {
  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [Task_name, setTask_name] = useState();
  const [Task_description, setTask_description] = useState();
  const [Task_plan, setTask_plan] = useState([]);
  const [taskCount, setTaskCount] = useState([]);
  const [Task_colour, setTask_colour] = useState();

  var taskCountHolder;

  if (taskCount === undefined) {
    taskCountHolder = 0;
  } else {
    taskCountHolder = taskCount.length;
  }

  let Task_id =
    JSON.parse(sessionStorage.getItem("ApplicationData")).App_Acronym +
    "_" +
    parseInt(
      JSON.parse(sessionStorage.getItem("ApplicationData")).App_Rnumber +
        taskCountHolder +
        1
    ).toString();

  let Task_app_Acronym = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Acronym;

  let Task_state = "Open";
  let Task_creator = JSON.parse(sessionStorage.getItem("token")).token.username;
  let Task_owner = Task_creator;
  let Task_createDate = new Date()
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join("-");

  let Task_notes =
    Task_creator +
    " created task: " +
    Task_name +
    " (Owner: " +
    Task_owner +
    ", Current state: " +
    Task_state +
    ", Created Date: " +
    Task_createDate +
    ").";

  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    GetPlanTaskCreate(setPlanOptions, Task_app_Acronym);
    GetTasks(
      setTaskCount,
      JSON.parse(sessionStorage.getItem("ApplicationData")).App_Acronym
    );
    navigate("/TaskCreatePage");
  }, [taskCount]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (SplitMultiselect(Task_plan, "Plan_MVP_name")) {
      GetPlanColour(
        SplitMultiselect(Task_plan, "Plan_MVP_name"),
        setTask_colour
      );
      // console.log(Task_colour);
    }

    // console.log(
    //   "Task name: " + Task_name,
    //   ", Task descri:" + Task_description,
    //   ", Task_plan:" + SplitMultiselect(Task_plan, "Plan_MVP_name"),
    //   ", Task_notes:" + Task_notes,
    //   ", Task_id:" + Task_id,
    //   ", Task_app_Acronym:" + Task_app_Acronym,
    //   ", Task_state:" + Task_state,
    //   ", Task_creator:" + Task_creator,
    //   ", Task_owner:" + Task_owner,
    //   ", Task_createDate:" + Task_createDate,
    //   ", Task_colour:" + Task_colour
    // );

    //=====================================Toastify=====================================
    if (!Task_name) {
      toast.warning("Please enter task name.", {
        hideProgressBar: true
      });
      return;
    }

    return fetch("/CreateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        Task_name: Task_name,
        Task_description: Task_description,
        Task_plan: SplitMultiselect(Task_plan, "Plan_MVP_name"),
        Task_notes: Task_notes,
        Task_id: Task_id,
        Task_app_Acronym: Task_app_Acronym,
        Task_state: Task_state,
        Task_creator: Task_creator,
        Task_owner: Task_owner,
        Task_createDate: Task_createDate
      })
    }).then(async res => {
      if (res.status === 200) {
        {
          toast.success("Task Created Successfully!", {
            hideProgressBar: true
          });

          e.target.reset();
          setTask_name();
          setTask_description();
          setTask_plan();
        }
      } else {
        const err_msg = await res.json();
        if (err_msg.duplicate === true) {
          toast.error("Task name is taken, please use another name.", {
            hideProgressBar: true
          });
        } else {
          toast.error("Failed to create task..", {
            hideProgressBar: true
          });
        }
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
                  <th>Task_description</th>
                  <th>Task_plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">
                    <input
                      onChange={e => setTask_name(e.target.value.trim())}
                      name="vanish"
                      type="text"
                      placeholder="Task_name"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID2">
                    <textarea
                      onChange={e => setTask_description(e.target.value)}
                      placeholder="Task_description"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID3">
                    <div>
                      <Multiselect
                        placeholder="Select Plan to assign"
                        displayValue="Plan_MVP_name"
                        onRemove={selection => {
                          setTask_plan(selection);
                        }}
                        onSelect={selection => {
                          setTask_plan(selection);
                        }}
                        options={planOptions}
                        showCheckbox
                        selectedValues={Task_plan}
                        selectionLimit={1}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>
                    <a href="/KanbanDisplay" className="spaceBetweenButtons">
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
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskCreatePage;
