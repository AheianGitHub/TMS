// NPM Modules Import
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Custom Modules Import
import UserToken from "./Components/UserToken";
import LoginPage from "./Views/LoginPage";
import MainMenuPage from "./Views/MainMenuPage";
import ProfilePage from "./Views/ProfilePage";
import ProfileEditPage from "./Views/ProfileEditPage";
import UserManagementPage from "./Views/UserManagementPage";
import UserCreatePage from "./Views/UserCreatePage";
import UserEditPage from "./Views/UserEditPage";
import GroupManagementPage from "./Views/GroupManagementPage";
import GroupCreatePage from "./Views/GroupCreatePage";
import TaskManagementSystemPage from "./Views/TaskManagementSystemPage";
import CreateAppPage from "./Views/CreateAppPage";
import InvalidPage from "./Views/InvalidPage";
import Header from "./Views/Header";
import { ToastContainer } from "react-toastify";

export default function SiangCo() {
  const { token, setToken } = UserToken();

  if (!token) {
    return (
      <>
        <ToastContainer />
        <LoginPage setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <Header token={token} />
      <div className="container">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route index element={<MainMenuPage token={token} />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/ProfileEditPage" element={<ProfileEditPage />} />
            <Route
              path="/UserManagementPage"
              element={<UserManagementPage />}
            />
            <Route path="/UserCreatePage" element={<UserCreatePage />} />
            <Route path="/UserEditPage" element={<UserEditPage />} />
            <Route path="*" element={<InvalidPage />} />
            <Route
              path="/GroupManagementPage"
              element={<GroupManagementPage />}
            />
            <Route path="/GroupCreatePage" element={<GroupCreatePage />} />
            <Route
              path="/TaskManagementSystemPage"
              element={<TaskManagementSystemPage />}
            />
            <Route path="/CreateAppPage" element={<CreateAppPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SiangCo />);
