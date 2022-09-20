import React, { useState, useEffect, Component } from "react";
import "../Table.css";
import { useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-toastify";

import GetGroups from "../Components/GetGroups";
import PreSelect from "../Components/PreSelect";
import SplitMultiselect from "../Components/SplitMultiselect";
import CreateApplication from "../Components/CreateApplication";

function AppEditPage(individualData) {
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

  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [appAcro, setAppAcro] = useState();
  const [appDesc, setAppDesc] = useState();
  const [appRNumber, setAppRNumber] = useState();
  const [appStartDate, setAppStartDate] = useState(
    new Date(App_startDate)
      .toLocaleDateString("pt-br")
      .split("/")
      .reverse()
      .join("-")
  );
  const [appEndDate, setAppEndDate] = useState(
    new Date(App_endDate)
      .toLocaleDateString("pt-br")
      .split("/")
      .reverse()
      .join("-")
  );
  const [appPermitCreate, setAppPermitCreate] = useState([]);
  const [preSelectedCreate, setPreSelectedCreate] = useState([]);

  const [appPermitOpen, setAppPermitOpen] = useState([]);
  const [preSelectedOpen, setPreSelectedOpen] = useState([]);

  const [appPermitToDoList, setAppPermitToDoList] = useState([]);
  const [preSelectedToDoList, setPreSelectedToDoList] = useState([]);

  const [appPermitDoing, setAppPermitDoing] = useState([]);
  const [preSelectedDoing, setPreSelectedDoing] = useState([]);

  const [appPermitDone, setAppPermitDone] = useState([]);
  const [preSelectedDone, setPreSelectedDone] = useState([]);

  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    GetGroups(setGroupOptions);
    navigate("/AppEditPage");
  }, []);

  useEffect(() => {
    let existing_Create = PreSelect(App_permit_Create);
    setPreSelectedCreate(existing_Create);
    setAppPermitCreate(existing_Create);

    let existing_Open = PreSelect(App_permit_Open);
    setPreSelectedOpen(existing_Open);
    setAppPermitOpen(existing_Open);

    let existing_ToDoList = PreSelect(App_permit_toDoList);
    setPreSelectedToDoList(existing_ToDoList);
    setAppPermitToDoList(existing_ToDoList);

    let existing_Doing = PreSelect(App_permit_Doing);
    setPreSelectedDoing(existing_Doing);
    setAppPermitDoing(existing_Doing);

    let existing_Done = PreSelect(App_permit_Done);
    setPreSelectedDone(existing_Done);
    setAppPermitDone(existing_Done);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      await CreateApplication(
        appAcro,
        appDesc,
        appRNumber,
        appStartDate,
        appEndDate,
        SplitMultiselect(appPermitOpen),
        SplitMultiselect(appPermitToDoList),
        SplitMultiselect(appPermitDoing),
        SplitMultiselect(appPermitDone),
        SplitMultiselect(appPermitCreate)
      )
    ) {
      toast.success("Application created successfully!", {
        hideProgressBar: true
      });

      // the set stuff change, also, the createapp componen test if working, and edit accordingly

      // e.target.reset();
      // setUserName();
      // setPassword();
      // setEmail();
      // setSelectedGroups();
    }
  };

  //   const splitted_group = SplitMultiselect(selectedGroups);

  //   if (!username && !password && !email && !selectedGroups) {
  //     toast.error("None of the fields have an input.", {
  //       hideProgressBar: true
  //     });
  //     return;
  //   }

  //   if (!username) {
  //     toast.warning("No username set.", {
  //       hideProgressBar: true
  //     });
  //     return;
  //   }

  //   if (!password) {
  //     toast.warning("No password set.", {
  //       hideProgressBar: true
  //     });
  //     return;
  //   }

  //   // Missing inputs
  //   if (password && !CheckPasswordField(password)) {
  //     return;
  //   }

  //   if (email && !CheckEmailField(email)) {
  //     return;
  //   }
  // };

  return (
    <>
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>App_Acronym</th>
                  <th>App_Description</th>
                  <th>App_Rnumber</th>
                  <th>App_startDate</th>
                  <th>App_endDate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td key="uniqueID1">{App_Acronym}</td>
                  <td key="uniqueID2">
                    <textarea
                      onChange={e => setAppDesc(e.target.value)}
                      placeholder={App_Description}
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID3">{App_Rnumber}</td>
                  <td key="uniqueID4">
                    <input
                      onChange={e => setAppStartDate(e.target.value)}
                      type="date"
                      value={appStartDate}
                      // onfocus="(this.type='date')"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID5">
                    <input
                      onChange={e => setAppEndDate(e.target.value)}
                      type="date"
                      value={appEndDate}
                      autoComplete="off"
                    />
                  </td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th>App_permit_Create</th>
                  <th>App_permit_Open</th>
                  <th>App_permit_toDoList</th>
                  <th>App_permit_Doing</th>
                  <th>App_permit_Done</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td key="uniqueID6">
                    <div>
                      <Multiselect
                        placeholder="Select Group"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitCreate(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitCreate(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={preSelectedCreate}
                      />
                    </div>
                  </td>
                  <td key="uniqueID7">
                    <div>
                      <Multiselect
                        placeholder="Select Group"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitOpen(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitOpen(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={preSelectedOpen}
                      />
                    </div>
                  </td>
                  <td key="uniqueID8">
                    <div>
                      <Multiselect
                        placeholder="Select Group"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitToDoList(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitToDoList(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={preSelectedToDoList}
                      />
                    </div>
                  </td>
                  <td key="uniqueID9">
                    <div>
                      <Multiselect
                        placeholder="Select Group"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitDoing(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitDoing(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={preSelectedDoing}
                      />
                    </div>
                  </td>
                  <td key="uniqueID10">
                    <div>
                      <Multiselect
                        placeholder="Select Group"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitDone(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitDone(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={preSelectedDone}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>
                    <a
                      href="/TaskManagementSystemPage"
                      className="spaceBetweenButtons"
                    >
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

export default AppEditPage;
