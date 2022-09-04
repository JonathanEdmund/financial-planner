import UserForm from "./components/UserForm";
import Alert from "react-bootstrap/Alert";
import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import axios from "axios";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const user = useContext(UserContext);

  function handleForm(userForm) {
    // send userInfo to authenticate in our server

    axios
      .post("/api/users?isRegistered=true", userForm)
      .then((response) => {
        const data = response.data;
        console.log(data.success);
        if (data.success) {
          user.setUser(data);
          setRedirect(true);
        } else {
          setShowAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-75 mt-3 mx-auto">
      <h1>Login</h1>
      <p>
        Don't have an account? <Link to="/Register">Click here.</Link>
      </p>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Password and/or Username is incorrect. Please try again.</p>
        </Alert>
      )}
      <UserForm handleForm={handleForm} />
    </div>
  );
}

export default Login;
