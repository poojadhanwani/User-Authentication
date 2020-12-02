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
import { Link, useHistory } from "react-router-dom";
import { UseAuth } from "../Contexts/AuthContext";

const Login = () => {
  const { login } = UseAuth();
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
      await login(email, pass);
      history.push("/welcome");
    } catch (error) {
      var errorCode = error.code;
      var failedAttempts = 0;
      if (errorCode === "auth/wrong-password") {
        failedAttempts++;
        if (failedAttempts > 3) {
          setError("Your Account is Locked!");
        } else {
          setError("Failed to Log In!");
        }
        //  console.log(`failed attempts:${failedAttempts} `);
      } else if (errorCode === "auth/too-many-requests") {
        setError("Your Account is Locked!");
      } else {
        setError("Failed to Log In!");
      }
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Log In</h2>
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
              Log In
            </Button>
          </Form>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Need an Account? <Link to="/signup">Sign Up</Link>
      </div>
    </React.Fragment>
  );
};
export default Login;
