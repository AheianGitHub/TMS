import { toast } from "react-toastify";
// Check email validity
const CheckEmailField = email => {
  let verifyEmail = new RegExp("(?=.*^[A-Za-z0-9.]{1,64}@[A-Za-z0-9.]{1,64}$)");
  // If email invalid, return false
  if (!verifyEmail.test(email)) {
    toast.warning("Please enter a valid email address", {
      hideProgressBar: true
    });
    return false;
  }
  // Else return true
  return true;
};

export default CheckEmailField;
