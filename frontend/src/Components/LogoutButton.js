function LogoutButton() {
  // Clear logout from backend and session
  fetch("/Logout", { method: "POST" });
  sessionStorage.clear();
}

export default LogoutButton;
