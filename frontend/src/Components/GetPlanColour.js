async function GetPlanColour(Plan_MVP_name, setTask_colour) {
  return fetch("/GetPlanColour", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      Plan_MVP_name: Plan_MVP_name
    })
  })
    .then(async res => await res.json())
    .then(json_res => {
      setTask_colour(json_res.result[0].Plan_Colour);
    });
}

export default GetPlanColour;
