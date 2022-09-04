import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UserForm(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleForm({
      username: form.username,
      password: form.password,
    });
    // sends back username & password
  }

  return (
    <Form className="w-50" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="Enter Username"
          value={form.username}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={handleChange}
          type="text"
          placeholder="Password"
          value={form.password}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UserForm;
