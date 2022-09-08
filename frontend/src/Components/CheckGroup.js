async function CheckGroup(username, groupname) {
  // let sessionID;
  return fetch("/CheckGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // POST content
    body: JSON.stringify({
      username: username,
      groupname: groupname
    })
  }).then(async res => await res.json());
}

export default CheckGroup;
