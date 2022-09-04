import UserForm from "./components/UserForm";
import Alert from "react-bootstrap/Alert";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register(props) {
  const [redirect, setRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  function handleForm(userForm) {
    // add user then redirect to login

    axios
      .post("/api/users?isRegistered=false", userForm)
      .then((response) => {
        const data = response.data;
        if (data.success) {
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
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-75 mt-3 mx-auto">
      <h1>Register</h1>
      <p>
        Already have an account? <Link to="/login">Click here.</Link>
      </p>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Username already exists. Please try again.</p>
        </Alert>
      )}

      <UserForm handleForm={handleForm} />
    </div>
  );
}

export default Register;
