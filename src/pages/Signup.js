import React, { useEffect, useState } from "react";
import Base from "../component/Base";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Form,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { signUp } from "../Services/user-service";
import { toast } from "react-toastify";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({ errors: {}, isError: false });

  const handleChange = (event, property) => {
    setData((pre) => {
      return { ...pre, [property]: event.target.value };
    });
  };

  //resetting the data
  const resetData = () => [
    setData({ username: "", email: "", password: "", about: "" }),
  ];

  //submit form
  //axios ->server call
  // react-toastify-for message displaying
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(data);

    signUp(data)
      .then((resp) => {
        console.log(resp);
        toast.success("User registered successfully");
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      });
    setData({ username: "", email: "", password: "", about: "" });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3> Fill Information to Register !!</h3>
              </CardHeader>
              <CardBody>
                {/* creating form  */}
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    {/* name field  */}
                    <label for="username">Enter User Name : </label>
                    <Input
                      type="text"
                      placeholder="enter User name here"
                      id="username"
                      onChange={(e) => handleChange(e, "username")}
                      value={data.username}
                      invalid={
                        error?.errors?.response?.data.username ? true : false
                      }
                    />
                    <FormFeedback>
                      {error?.errors?.response?.data.username}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    {/* email field */}
                    <label for="email">Enter Email : </label>
                    <Input
                      type="email"
                      placeholder="enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error?.errors?.response?.data.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error?.errors?.response?.data.email}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    {/* password field */}
                    <label for="password">Enter Password : </label>
                    <Input
                      type="password"
                      placeholder="enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error?.errors?.response?.data.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error?.errors?.response?.data.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    {/* about field */}
                    <label for="about">Enter About : </label>
                    <Input
                      type="textarea"
                      placeholder="enter here"
                      id="about"
                      style={{ height: "250px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error?.errors?.response?.data.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error?.errors?.response?.data.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button className="mr-1" outline color="light">
                      Register
                    </Button>
                    <Button
                      outline
                      color="secondary"
                      className="ms-2"
                      type="reset"
                      onClick={resetData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Signup;
