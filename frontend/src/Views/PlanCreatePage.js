import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../Table.css";

function PlanCreatePage() {
  let App_Acronym = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Acronym;

  let App_startDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_startDate;

  let App_endDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_endDate;

  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [planMVPName, setPlanMVPName] = useState();
  const [planStartDate, setPlanStartDate] = useState();
  const [planEndDate, setPlanEndDate] = useState();
  const [planColour, setPlanColour] = useState();

  useEffect(() => {
    navigate("/PlanCreatePage");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (planStartDate > planEndDate) {
      toast.warning("Plan End Date cannot be before Plan Start Date.", {
        hideProgressBar: true
      });
      return;
    }

    if (planStartDate < App_startDate || planStartDate > App_endDate) {
      toast.warning(
        "Plan Start Date has to be within App Start & App End Date.",
        {
          hideProgressBar: true
        }
      );
      return;
    }

    if (planEndDate < App_startDate || planEndDate > App_endDate) {
      toast.warning(
        "Plan End Date has to be within App Start & App End Date.",
        {
          hideProgressBar: true
        }
      );
      return;
    }

    return fetch("/CreatePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        Plan_MVP_name: planMVPName,
        Plan_startDate: planStartDate,
        Plan_endDate: planEndDate,
        Plan_app_Acronym: App_Acronym,
        Plan_Colour: planColour
      })
    }).then(async res => {
      if (res.status === 200) {
        {
          toast.success("Plan Created Successfully!", {
            hideProgressBar: true
          });

          e.target.reset();
          setPlanMVPName();
          setPlanStartDate();
          setPlanEndDate();
          setPlanColour();
        }
      } else {
        const err_msg = await res.json();
        if (err_msg.duplicate === true) {
          toast.error("Plan_MVP_name is taken, please use another name.", {
            hideProgressBar: true
          });
        } else {
          toast.error("Failed to create plan..", {
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
                  <th>Plan_MVP_name</th>
                  <th>Plan_startDate</th>
                  <th>Plan_endDate</th>
                  <th>Plan_app_Acronym</th>
                  <th>Colour for Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">
                    <input
                      onChange={e => setPlanMVPName(e.target.value.trim())}
                      name="vanish"
                      type="text"
                      placeholder="Plan_MVP_name"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID2">
                    <input
                      onChange={e => setPlanStartDate(e.target.value)}
                      type="date"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID3">
                    <input
                      onChange={e => setPlanEndDate(e.target.value)}
                      type="date"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID4">{App_Acronym}</td>
                  <td key="uniqueID5">
                    <input
                      onChange={e => setPlanColour(e.target.value)}
                      type="color"
                      id="favcolor"
                      name="favcolor"
                      placeholder="#ff0000"
                    />
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

export default PlanCreatePage;
