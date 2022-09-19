import React, { useState, useEffect, Component } from "react";
import "../Table.css";
import { useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import GetGroups from "../Components/GetGroups";
import SplitMultiselect from "../Components/SplitMultiselect";
import CreateApplication from "../Components/CreateApplication";

function AppCreatePage() {
  // Set useNavigate as variable
  const navigate = useNavigate();
  //setUsername = use this to hold/set the values | username = will become the storer of value that is in set__
  const [appAcro, setAppAcro] = useState();
  const [appDesc, setAppDesc] = useState();
  const [appRNumber, setAppRNumber] = useState();
  const [appStartDate, setAppStartDate] = useState();
  const [appEndDate, setAppEndDate] = useState();
  const [appPermitOpen, setAppPermitOpen] = useState([]);
  const [appPermitToDoList, setAppPermitToDoList] = useState([]);
  const [appPermitDoing, setAppPermitDoing] = useState([]);
  const [appPermitDone, setAppPermitDone] = useState([]);
  const [appPermitCreate, setAppPermitCreate] = useState([]);

  const [groupOptions, setGroupOptions] = useState([]);
  // const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    GetGroups(setGroupOptions);
    navigate("/AppCreatePage");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    console.log(
      appAcro,
      +" ",
      appDesc,
      +" ",
      appRNumber,
      +" ",
      appStartDate,
      +" ",
      appEndDate,
      +" ",
      appPermitOpen,
      +" ",
      appPermitToDoList,
      +" ",
      appPermitDoing,
      +" ",
      appPermitDone,
      +" ",
      appPermitCreate
    );

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
                  <td key="uniqueID1">
                    <input
                      onChange={e => setAppAcro(e.target.value.trim())}
                      name="vanish"
                      type="text"
                      placeholder="App Acronym"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID2">
                    <textarea
                      onChange={e => setAppDesc(e.target.value)}
                      placeholder="App Description"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID3">
                    <input
                      onChange={e => setAppRNumber(e.target.value.trim())}
                      name="vanish"
                      type="text"
                      placeholder="App R Number"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID4">
                    <input
                      // onChange={e => console.log(e.target.value)}
                      onChange={e => setAppStartDate(e.target.value)}
                      type="date"
                      autoComplete="off"
                    />
                  </td>
                  <td key="uniqueID5">
                    <input
                      onChange={e => setAppEndDate(e.target.value)}
                      type="date"
                      autoComplete="off"
                    />
                  </td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th>App_permit_Open</th>
                  <th>App_permit_toDoList</th>
                  <th>App_permit_Doing</th>
                  <th>App_permit_Done</th>
                  <th>App_permit_Create</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td key="uniqueID6">
                    <div>
                      <Multiselect
                        placeholder="Select Group(s)"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitOpen(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitOpen(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={appPermitOpen}
                      />
                    </div>
                  </td>
                  <td key="uniqueID7">
                    <div>
                      <Multiselect
                        placeholder="Select Group(s)"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitToDoList(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitToDoList(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={appPermitToDoList}
                      />
                    </div>
                  </td>
                  <td key="uniqueID8">
                    <div>
                      <Multiselect
                        placeholder="Select Group(s)"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitDoing(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitDoing(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={appPermitDoing}
                      />
                    </div>
                  </td>
                  <td key="uniqueID9">
                    <div>
                      <Multiselect
                        placeholder="Select Group(s)"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitDone(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitDone(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={appPermitDone}
                      />
                    </div>
                  </td>
                  <td key="uniqueID10">
                    <div>
                      <Multiselect
                        placeholder="Select Group(s)"
                        displayValue="groupname"
                        onRemove={selection => {
                          setAppPermitCreate(selection);
                        }}
                        onSelect={selection => {
                          setAppPermitCreate(selection);
                        }}
                        options={groupOptions}
                        showCheckbox
                        selectedValues={appPermitCreate}
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

export default AppCreatePage;
