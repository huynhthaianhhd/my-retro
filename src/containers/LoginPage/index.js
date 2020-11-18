import React from "react";
import FormLogin from "../../components/FormLogin";
import { useHistory } from "react-router-dom";
import "./index.css";
function LoginPage() {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    history.push({
      pathname: `/home`,
    });
  }
    return (
      <div className="login-page">
        <div className="fun-retro">FunRetro</div>
        <FormLogin />
      </div>
    );
}

export default LoginPage;
