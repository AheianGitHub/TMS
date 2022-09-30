function GetTaskByState(
  Username,
  Password,
  Status,
  Task_app_Acronym,
  Task_state
) {
  return fetch("/GetTaskByState", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Username: Username,
      Password: Password,
      Status: Status,
      Task_app_Acronym: Task_app_Acronym,
      Task_state: Task_state
    })
  }).then(async res => await res.json());
}
