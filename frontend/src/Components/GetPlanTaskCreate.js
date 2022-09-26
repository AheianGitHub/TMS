async function GetPlanTaskCreate(setPlanOptions, Task_app_Acronym) {
  return fetch("/GetPlanTaskCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Task_app_Acronym: Task_app_Acronym
    })
  })
    .then(async res => await res.json())
    .then(json_res => {
      setPlanOptions(json_res.result);
    });
}

export default GetPlanTaskCreate;
