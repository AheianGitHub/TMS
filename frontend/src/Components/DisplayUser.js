async function DisplayUser(username, setDataHold) {
  return fetch("/GetUserData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // POST content
    body: JSON.stringify({
      username: username
    })
  })
    .then(async res => await res.json())
    .then(json_res => setDataHold(json_res));
}

export default DisplayUser;
