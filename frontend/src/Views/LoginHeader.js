import "../Header.css";
import Smug from "../OfficeBoy.jpg"; // relative path to image

function Header({ token }) {
  return (
    <>
      <title>HomePage</title>
      {/* Nav Bar */}
      <div className="header">
        <a className="logo">
          <p>
            SiangBan Board.
            <img src={Smug} alt={"logo"} width="100" height="100" />
          </p>
        </a>
      </div>
    </>
  );
}

export default Header;
