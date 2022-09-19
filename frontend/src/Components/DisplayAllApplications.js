async function DisplayAllApplications(setDataHold) {
  return fetch("/GetAllApplications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(async res => await res.json())
    .then(json_res => setDataHold(json_res));
}

export default DisplayAllApplications;
