import React from "react";
import "./styles.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Container } from "reactstrap";
import { AuthProvider } from "./Contexts/AuthContext";
import Welcome from "./Components/Welcome";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <BrowserRouter>
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/welcome" component={Welcome} />
              </Switch>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  );
}
