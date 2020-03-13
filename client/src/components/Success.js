import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Row } from 'reactstrap';
import axios from 'axios';
import { Media } from 'reactstrap';
import Logo from '../components/assets/Logo.png';

var imgStyle = {
  // minWidth: "28px",
  // paddingLeft: "60%",
};

class Success extends React.Component {
    state = {

    };


    render() {
        return (
            <div className="login" style={{paddingTop: "3%"}}>
              <container>
              <FormGroup row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <div style={{textAlign: "center", color:"black"}}><h1>W E L C O M E</h1></div>
                </Col>
                </FormGroup>
                <FormGroup row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
              <div style={{textAlign: "center", color:"black"}}><p>TO</p></div>
                </Col>
                </FormGroup>
                <Row>
                <Col sm="12" md={{ size: 7, offset: 4 }}>
      <div style={{paddingLeft: "4%", paddingTop: ".25%"}}><img src={Logo} alt="Logo" /></div>
    </Col>
  </Row>
                {/* <Media row>
      <Media >
      <Col sm="12" md={{ size: 1, offset: 11 }}>
      <div className="float-left"><Media style={imgStyle} object src={Logo} alt="Logo" /></div>
        </Col>
      </Media>
      </Media> */}
      <row>
        <div style={{paddingTop: "1.5%"}}>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <div className="text-center"><Button color="secondary" href={"/"}>BACK TO LOGIN</Button></div>
      </Col>
      </div>
      </row>
  
    </container>
            </div>
        );
    }
}

export default Success;