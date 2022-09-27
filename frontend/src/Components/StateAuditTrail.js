import { toast } from "react-toastify";

async function StateAuditTrail(Task_name, Task_notes) {
  //e.preventDefault();

  return fetch("/StateAuditTrail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Task_name: Task_name,
      Task_notes: Task_notes
    })
  })
    .then(async res => await res.json())
    .then(json_res => {
      if (json_res.result === true) {
        toast.success("Task Notes Updated!", {
          hideProgressBar: true
        });
      } else {
        toast.warn("Error encountered when updating task notes!", {
          hideProgressBar: true
        });
      }
    });
}

export default StateAuditTrail;
