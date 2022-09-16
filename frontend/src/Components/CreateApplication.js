import { toast } from "react-toastify";

async function CreateApplication(
  appAcro,
  appDesc,
  appRNumber,
  appStartDate,
  appEndDate,
  appPermitOpen,
  appPermitToDoList,
  appPermitDoing,
  appPermitDone,
  appPermitCreate
) {
  return fetch("/CreateApplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // POST content
    body: JSON.stringify({
      App_Acronym: appAcro,
      App_Description: appDesc,
      App_Rnumber: appRNumber,
      App_startDate: appStartDate,
      App_endDate: appEndDate,
      App_permit_Open: appPermitOpen,
      App_permit_toDoList: appPermitToDoList,
      App_permit_Doing: appPermitDoing,
      App_permit_Done: appPermitDone,
      App_permit_Create: appPermitCreate
    })
  }).then(async res => {
    if (res.status === 200) {
      return true;
      // toast.success("Application created successfully!", {
      //   hideProgressBar: true
      // });
      // e.target.reset();
      // setUserName();
      // setPassword();
      // setEmail();
      // setSelectedGroups();
    } else {
      // Unpack error message
      const err_msg = await res.json();
      // Duplicate error message
      if (err_msg.duplicate === true) {
        toast.error("App Acronym is taken, please use another acronym.", {
          hideProgressBar: true
        });
      }
      // Not duplicate error message
      else {
        toast.error("Profile Update Failure..", {
          hideProgressBar: true
        });
      }

      return false;
    }
  });
}

export default CreateApplication;
