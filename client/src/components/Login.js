import React from "react";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {
    state = {

    };

    // LOGIN: need input fields (name, password, email)
    // REGISTER: need input fields (..., password2)

    handleSubmit = (event) => {
      event.preventDefault();
        console.log("button")
        // handle form submit
        // captures input values
        // sends values to api register route, as an object {name, email, pw}
        // on response, redirect to home page
        axios.post('/api/users/login', {
            email: "example@email.com",
            password: "1234"
        }).then(function (response) {
            console.log(response)
            // window.location.href = "/private";
        })
    }

    render() {
        return (
            <div className="login">
              <container>
    <FormGroup row>
    <Col sm="12" md={{ size: 6, offset: 3 }}>
                <div style={{paddingTop: "5%"}}>Login</div>
                </Col>
                </FormGroup>
                <Form action="/api/users/login" method="post">
      <FormGroup row style={{paddingTop: ".50%"}}>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Input type="email" name="email" id="email" placeholder="Email" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Input type="password" name="password" id="password" placeholder="Password" />
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{paddingTop: ".50%"}}>
          <Button type="submit">Submit</Button>
        </Col>
      </FormGroup>
    </Form>
    <FormGroup row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <div style={{textAlign: "center", paddingTop: "1%"}}><h4> - OR - </h4></div>
                </Col>
                </FormGroup>
    <FormGroup row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <div style={{paddingTop: "5%"}}>Register</div>
                </Col>
                </FormGroup>
                <Form action="/api/users/register" method="post">
                <FormGroup row>
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{paddingTop: ".50%"}}>
          <Input type="name" name="name" id="name" placeholder="Name" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Input type="email" name="email" id="email" placeholder="Email" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Input type="password" name="password" id="password" placeholder="Password" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Input type="password" name="password2" id="password2" placeholder="Re-enter Password" />
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{paddingTop: ".50%"}}>
          <Button type="submit">Submit</Button>
        </Col>
      </FormGroup>
    </Form>
    </container>
            </div>
        );
    }
}

export default Login;