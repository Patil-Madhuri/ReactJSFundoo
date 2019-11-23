import React, { Component } from 'react';
import { Card, Row, Col, Navbar, Fa,Input} from 'mdbreact';
import Button from '@material-ui/core/Button';
var userCtrl = require('../controllers/UserCtrl');

class Login extends Component {
    
    constructor(){
        super();
        userCtrl.login = userCtrl.login.bind(this);
    }
   
    render() {
        return (
            <div className="flex-row loginCard">
            <Card>
                <form>
                    <Row>
                        <Col>
                            <Navbar className="loginBar">
                                <p className="login">
                                    <Fa className="fa fa-lock" />
                                    <span>&nbsp;&nbsp;Login</span>
                                </p>
                            </Navbar>
                            <div className="grey-text p-2" >
                                <Input label="Email" icon="envelope"  type="email"  id="username"/>
                                <div id="error" className="errorMessage"></div>
                                <Input label="Password" icon="lock"  type="password"  id="password"/>
                                <div className="text-center">
                                    <Button className="loginBtn" style={{'text-transform': 'initial'}} onClick={userCtrl.login}>Login</Button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <span>Not a member? <a href='register'>Sign Up</a>
                                    <br />
                                    Forgot <a href='forgotPassword'>Password?</a></span>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Card>
        </div>
        );
    }
}


export default Login;

