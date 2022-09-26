async function GetTasks(setTaskTableData, App_Acronym) {
  return fetch("/GetTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Task_app_Acronym: App_Acronym
    })
  })
    .then(async res => await res.json())
    .then(json_res => {
      setTaskTableData(json_res.result);
    });
}

export default GetTasks;
