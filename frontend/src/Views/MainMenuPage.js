import SweetLove from "../up-love.gif"; // relative path to image
import "../Table.css";

function MainMenuPage() {
  const username = JSON.parse(sessionStorage.getItem("token")).token.username;

  return (
    <>
      <div>
        <p>
          Hello <strong>{username}</strong>, what would you like to do?
        </p>
      </div>

      {/* Main Menu temporary content */}
      <div className="container">
        <div className="pt-5 text-white">
          <header className="py-5 mt-5">
            <p className="lead mb-0">
              ============================================================================================================================================================================================
              <br></br> Main Menu page by{" "}
              <a
                href="https://www.linkedin.com/in/taychersiang"
                className="text-white"
              >
                <u>本大爷</u>
              </a>
            </p>
          </header>
          <div className="py-5">
            <p className="lead">
              Remember why you're here, you can do it!
              <br></br>
              要求婚咯! Do your best, 加油!
              <br></br>
              <br></br>
              <strong className="font-weight-bold">
                Cher Siang in 2 years' time:
              </strong>
            </p>
          </div>
        </div>
      </div>
      <img className="animated-gif" src={SweetLove} />
      <p>
        <a href="https://www.gov.sg/article/call-these-helplines-if-you-need-emotional-or-psychological-support">
          <u>This is a call for help if you ever need it hahaha</u>
        </a>
        <br></br>
        ============================================================================================================================================================================================
      </p>
    </>
  );
}

export default MainMenuPage;
