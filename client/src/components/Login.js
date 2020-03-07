import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {
    state = {

    };

    // LOGIN: need input fields (name, password, email)
    // REGISTER: need input fields (..., password2)

    handleSubmit = () => {
        console.log("button")
        // handle form submit
        // captures input values
        // sends values to api register route, as an object {name, email, pw}
        // on response, redirect to home page
        axios.post('/api/users/auth/openid', {
            email: "",
            password: ""
        }).then(function (response) {
            console.log(response)
        })
    }

    render() {
        return (
            <div className="login">
                <Form action="/api/users/auth/openid" method="post">
      <FormGroup row>
        <Label for="loginEmail" sm={2}>Email</Label>
        <Col sm={10}>
          <Input type="email" name="email" id="loginEmail" placeholder="example@email.com" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="loginPassword" sm={2}>Password</Label>
        <Col sm={10}>
          <Input type="password" name="password" id="loginPassword" placeholder="password" />
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button onClick={() => this.handleSubmit()} type="submit">Submit</Button>
        </Col>
      </FormGroup>
    </Form>
            </div>
        );
    }
}

export default Login;