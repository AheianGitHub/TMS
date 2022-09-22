async function GetPlans(setPlanOptions) {
  return fetch("/GetPlans", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(async res => await res.json())
    .then(json_res => {
      setPlanOptions(json_res.result);
    });
}

export default GetPlans;
