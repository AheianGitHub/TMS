import { toast } from "react-toastify";

async function SendMail(username, Task_name) {
  return (
    fetch("/SendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // POST content
      body: JSON.stringify({
        username: username,
        Task_name: Task_name
      })
    })
      .then(async res => {
        // Successful updating user
        if (res.status === 200) {
          toast.success("Email sent to project lead on task state change", {
            hideProgressBar: true
          });
        }
        // Unsuccessful updating user, throw error
        else {
          throw Error;
        }
      })
      .then(() => true)
      // Error handling
      .catch(() => {
        toast.error("Error sending email to lead", { hideProgressBar: true });
      })
  );
}
export default SendMail;
