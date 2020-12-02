import React, { useState } from "react";
import {
  Card,
  CardBody,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { UseAuth } from "../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const { signup } = UseAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      //console.log(email, pass);
      await signup(email, pass);
      history.push("/");
    } catch {
      setError("Failed to create an Account!");
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                name="pass"
                type="password"
                value={pass}
                required
                onChange={(e) => setPass(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              className="w-100"
              color="primary"
              disabled={loading}
            >
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Already have an account? <Link to="/login"> Log In</Link>
      </div>
    </React.Fragment>
  );
};

export default Signup;
