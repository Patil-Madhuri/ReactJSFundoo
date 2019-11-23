import React, { Component } from 'react';
import {Card,Row,Col,Navbar,Input} from 'mdbreact';
import Button from '@material-ui/core/Button';
var userCtrl = require('../controllers/UserCtrl.js');

class Register extends Component {
    constructor(){
        super();
        userCtrl.register = userCtrl.register.bind(this);
    }
    
    render() {
        return (
            <div className="registerCard flex-row">
            <Card>
                <form>
                    <Row>
                        <Col>
                            <Navbar className="registerBar">
                                    <p>Register</p>
                            </Navbar>
                            <div className="grey-text p-2">
                                <Input label="Name" icon="user" id="name" type="text"  />
                                <Input label="Email" icon="envelope" id="username" type="email"  />
                                <Input label="Password" icon="lock" id="password" type="password"  />
                                <Input label="Confirm Password" icon="lock" id="cpassword" type="password" />
                                <div id="error" className="errorMessage"></div>

                                <div className="text-center">
                                    <Button className="registerBtn" onClick={userCtrl.register}>Register</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Card>
        </div>       
     );
    }
}

export default Register;