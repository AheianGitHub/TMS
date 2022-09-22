import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import GetPlans from "../Components/GetPlans";

import "../Table.css";

function TaskCreatePage() {
  let Task_id = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Rnumber;

  let App_startDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_startDate;

  let App_endDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_endDate;

  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [Task_name, setTask_name] = useState();
  const [Task_description, setTask_description] = useState();
  const [Task_notes, setTask_notes] = useState();
  // const [Task_id, setTask_id] = useState();
  const [Task_plan, setTask_plan] = useState([]);
  const [Task_app_Acronym, setTask_app_Acronym] = useState();
  const [Task_state, setTask_state] = useState();
  const [Task_creator, setTask_creator] = useState();
  const [Task_owner, setTask_owner] = useState();
  const [Task_createDate, setTask_createDate] = useState();

  //creator = owner, onEdit or onShift: owner = person who made edit
  //task_id = app_rnumber + (no.of task in app - create a getTask function, then .length() the result) + 1
  //task_state = force it to always be Open on creation, can only edit task_state via shifting, edit cannot
  //task_createDate = get current date, will not change after that, same as creator

  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    GetPlans(setPlanOptions);
    navigate("/TaskCreatePage");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    //=====================================Toastify=====================================
    // if (planStartDate > planEndDate) {
    //   toast.warning("Plan End Date cannot be before Plan Start Date.", {
    //     hideProgressBar: true
    //   });
    //   return;
    // }

    // if (planStartDate < App_startDate || planStartDate > App_endDate) {
    //   toast.warning(
    //     "Plan Start Date has to be within App Start & App End Date.",
    //     {
    //       hideProgressBar: true
    //     }
    //   );
    //   return;
    // }

    // if (planEndDate < App_startDate || planEndDate > App_endDate) {
    //   toast.warning(
    //     "Plan End Date has to be within App Start & App End Date.",
    //     {
    //       hideProgressBar: true
    //     }
    //   );
    //   return;
    // }

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
        Task_notes: Task_notes,
        Task_id: Task_id,
        Task_plan: Task_plan,
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
