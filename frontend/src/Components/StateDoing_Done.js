import { toast } from "react-toastify";

async function StateDoing_Done(Task_name) {
  //e.preventDefault();

  return fetch("/StateDoing_Done", {
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
        toast.success("Task State has been changed (Doing -> Done)!", {
          hideProgressBar: true
        });
      } else {
        toast.warn("Error encountered when changing task state!", {
          hideProgressBar: true
        });
      }
    });
}

export default StateDoing_Done;
