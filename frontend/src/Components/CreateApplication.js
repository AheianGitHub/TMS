import { toast } from "react-toastify";

async function CreateApplication(
  appAcro,
  appDesc,
  appRNumber,
  appStartDate,
  appEndDate,
  appPermitCreate,
  appPermitOpen,
  appPermitToDoList,
  appPermitDoing,
  appPermitDone
) {
  if (
    !appAcro &&
    !appRNumber &&
    !appStartDate &&
    !appEndDate &&
    !appPermitCreate &&
    !appPermitOpen &&
    !appPermitToDoList &&
    !appPermitDoing &&
    !appPermitDone
  ) {
    toast.error("None of the required fields have an input.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appAcro) {
    toast.warning("No App_Acronym set.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appAcro.match(/^[A-Za-z]+$/)) {
    toast.warning(
      "Only alphabets allowed for App_Acronym. Do not include spacing as well",
      {
        hideProgressBar: true
      }
    );
    return;
  }

  if (!appRNumber) {
    toast.warning("No Rnumber set.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appStartDate) {
    toast.warning("Start Date not set.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appEndDate) {
    toast.warning("End Date not set.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appPermitCreate) {
    toast.warning("No group selected for App_permit_Create.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appPermitOpen) {
    toast.warning("No group selected for App_permit_Open.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appPermitToDoList) {
    toast.warning("No group selected for App_permit_toDoList.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appPermitDoing) {
    toast.warning("No group selected for App_permit_Doing.", {
      hideProgressBar: true
    });
    return;
  }

  if (!appPermitDone) {
    toast.warning("No group selected for App_permit_Done.", {
      hideProgressBar: true
    });
    return;
  }

  if (appStartDate > appEndDate) {
    toast.warning("End Date cannot be before Start Date.", {
      hideProgressBar: true
    });
    return;
  }

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
        toast.error("Failed to create app..", {
          hideProgressBar: true
        });
      }

      return false;
    }
  });
}

export default CreateApplication;
