function PromoteTask2Done(Username, Password, Status, Task_name, Task_state) {
  return fetch("/PromoteTask2Done", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Username: Username,
      Password: Password,
      Status: Status,
      Task_name: Task_name,
      Task_state: Task_state
    })
  }).then(async res => await res.json());
}
