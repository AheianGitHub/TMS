async function GetGroups(setGroupTableData) {
  return fetch("/GetGroups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(async res => await res.json())
    .then(json_res => {
      setGroupTableData(json_res.result);
    });
}

export default GetGroups;
