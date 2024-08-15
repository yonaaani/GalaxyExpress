import { useEffect, useState } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Authorization from "./pages/Authorization";
import Registration from "./pages/Registration";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import LoginRecoveryPage from "./pages/LoginRecoveryPage";
import EditAccountPage from "./pages/EditAccountPage";
import GeneralPage from "./pages/GeneralPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Main Page";
        metaDescription = "Welcome to the main page";
        break;
      case "/authorization":
        title = "Authorization";
        metaDescription = "Login to your account";
        break;
      case "/registration":
        title = "Registration";
        metaDescription = "Create a new account";
        break;
      case "/passwordRecovery":
        title = "Password Recovery";
        metaDescription = "Recover your password";
        break;
      case "/loginRecovery":
        title = "Login Recovery";
        metaDescription = "Recover your login";
        break;
      case "/editAccount":
        title = "Edit Account";
        metaDescription = "Edit your account details";
        break;
      case "/general":
        title = "General Page";
        metaDescription = "View information in first home page";
        break;
      default:
        title = "Page";
        metaDescription = "Page description";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/reset-password" element={<PasswordRecoveryPage />} />
      <Route path="/loginRecovery" element={<LoginRecoveryPage />} />
      {token ? (
        <>
          <Route path="/editAccount" element={<EditAccountPage />} /> 
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmailPage />} />
        </>
      ) : (
        <Navigate to="/authorization" />
      )}
    </Routes>
  );
}

export default App;
