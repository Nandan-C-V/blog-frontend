import React, { useState } from "react";
import Base from "../component/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";
import { userLogin } from "../Services/user-service";
import { doLogin } from "../Auth";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const handleChange = (event, field) => {
    const val = event.target.value;
    setLoginDetails({ ...loginDetails, [field]: val });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetails);
    if (
      loginDetails.usernameOrEmail.trim() == "" ||
      loginDetails.password.trim() == ""
    ) {
      toast.error("email or password should not be empty");
      return;
    }

    userLogin(loginDetails)
      .then((data) => {
        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          navigate("/user/dashboard");
        });
        toast.success("User Login successfully");
      })
      .catch((error) => {
        console.log(error);
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          toast.error("invalid email or password");
        } else {
          toast.error("something went wrong");
        }
      });
    setLoginDetails({ usernameOrEmail: "", password: "" });
  };
  const handleReset = () => {
    setLoginDetails({
      usernameOrEmail: "",
      password: "",
    });
  };
  return (
    <div>
      {" "}
      <Base>
        <Container>
          <Row className="mt-2">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card color="dark" inverse>
                <CardHeader>
                  <h3>Login Here</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    {/* email field
                     */}
                    <FormGroup>
                      <Label for="text">Enter Email</Label>
                      <Input
                        type="text"
                        id="email"
                        value={loginDetails.usernameOrEmail}
                        onChange={(e) => handleChange(e, "usernameOrEmail")}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input
                        type="password"
                        id="password"
                        value={loginDetails.password}
                        onChange={(e) => handleChange(e, "password")}
                      ></Input>
                    </FormGroup>
                    <Container className="text-center">
                      <Button outline color="light">
                        Login
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        className="ms-2"
                        onClick={handleReset}
                      >
                        reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>{" "}
      </Base>
    </div>
  );
}

export default Login;
