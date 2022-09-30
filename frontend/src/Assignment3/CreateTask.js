function CreateTask(
  Task_name,
  Task_description,
  Task_notes,
  Task_id,
  Task_plan,
  Task_app_Acronym,
  Task_state,
  Task_creator,
  Task_owner,
  Task_createDate
) {
  return fetch("/CreateTask", {
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
      Task_description: Task_description,
      Task_notes: Task_notes,
      Task_id: Task_id,
      Task_plan: Task_plan,
      Task_app_Acronym: Task_app_Acronym,
      Task_state: Task_state,
      Task_creator: Task_creator,
      Task_owner: Task_owner,
      Task_createDate: Task_createDate
    })
  }).then(async res => await res.json());
}
