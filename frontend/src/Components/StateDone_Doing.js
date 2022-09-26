import { toast } from "react-toastify";

async function StateDone_Doing(Task_name) {
  //e.preventDefault();

  return fetch("/StateDone_Doing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Task_name: Task_name
    })
  })
    .then(async res => await res.json())
    .then(json_res => {
      if (json_res.result === true) {
        toast.success("Task State has been changed (Done -> Doing)!", {
          hideProgressBar: true
        });
      } else {
        toast.warn("Error encountered when changing task state!", {
          hideProgressBar: true
        });
      }
    });
}

export default StateDone_Doing;
