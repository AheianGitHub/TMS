import "../Header.css";
import Smug from "../OfficeBoy.jpg"; // relative path to image
import LogoutButton from "../Components/LogoutButton";

function Header({ token }) {
  const status = JSON.parse(sessionStorage.getItem("token")).token.admin;
  return (
    <>
      <title>HomePage</title>

      {/*Nav Bar*/}
      <div className="header">
        <a className="logo">
          <p>
            SiangBan Board.
            <img src={Smug} alt={"logo"} width="100" height="100" />
          </p>
        </a>
        <div className="header-right">
          <a className="active" href="/">
            Main Menu
          </a>
          <a href="/ProfilePage">View Profile</a>

          <a href="/" onClick={LogoutButton}>
            Logout
          </a>

          {status && (
            <div>
              <a href="/UserManagementPage">User Management</a>{" "}
              <a href="/GroupManagementPage">Group Management</a>
            </div>
          )}
          <div>
            <a href="/TaskManagementSystemPage">Task Management System</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
