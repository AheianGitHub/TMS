import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../Table.css";

function PlanEditPage() {
  let App_Acronym = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_Acronym;

  let App_startDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_startDate;

  let App_endDate = JSON.parse(
    sessionStorage.getItem("ApplicationData")
  ).App_endDate;

  let Plan_MVP_name = JSON.parse(
    sessionStorage.getItem("PlanData")
  ).Plan_MVP_name;

  let Plan_startDate = JSON.parse(
    sessionStorage.getItem("PlanData")
  ).Plan_startDate;

  let Plan_endDate = JSON.parse(
    sessionStorage.getItem("PlanData")
  ).Plan_endDate;

  let Plan_Colour = JSON.parse(sessionStorage.getItem("PlanData")).Plan_Colour;

  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [planStartDate, setPlanStartDate] = useState(
    new Date(Plan_startDate)
      .toLocaleDateString("pt-br")
      .split("/")
      .reverse()
      .join("-")
  );
  const [planEndDate, setPlanEndDate] = useState(
    new Date(Plan_endDate)
      .toLocaleDateString("pt-br")
      .split("/")
      .reverse()
      .join("-")
  );
  const [planColour, setPlanColour] = useState(Plan_Colour);

  useEffect(() => {
    navigate("/PlanEditPage");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      new Date(Plan_startDate)
        .toLocaleDateString("pt-br")
        .split("/")
        .reverse()
        .join("-") === planStartDate &&
      new Date(Plan_endDate)
        .toLocaleDateString("pt-br")
        .split("/")
        .reverse()
        .join("-") === planEndDate &&
      Plan_Colour === planColour
    ) {
      toast.warning("No changes recorded.", {
        hideProgressBar: true
      });
      return;
    }

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

    return fetch("/EditPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        Plan_MVP_name: Plan_MVP_name,
        Plan_startDate: planStartDate,
        Plan_endDate: planEndDate,
        Plan_app_Acronym: App_Acronym,
        Plan_Colour: planColour
      })
    }).then(async res => {
      if (res.status === 200) {
        {
          toast.success("Plan Edited Successfully!", {
            hideProgressBar: true
          });

          setTimeout(() => {
            navigate("/KanbanDisplay");
            sessionStorage.removeItem("PlanData");
          }, 2000);
        }
      } else {
        toast.error("Failed to edit application..", {
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
                  <th>Plan_MVP_name</th>
                  <th>Plan_startDate</th>
                  <th>Plan_endDate</th>
                  <th>Plan_app_Acronym</th>
                  <th>Colour for Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">{Plan_MVP_name}</td>
                  <td key="uniqueID2">
                    <input
                      onChange={e => setPlanStartDate(e.target.value)}
                      type="date"
                      value={planStartDate}
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID3">
                    <input
                      onChange={e => setPlanEndDate(e.target.value)}
                      type="date"
                      value={planEndDate}
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
                      value={planColour}
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

export default PlanEditPage;
