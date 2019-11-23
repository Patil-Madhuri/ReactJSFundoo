import React, { Component } from 'react';
import { Navbar, Input, Card, Row, Col } from 'mdbreact';
import Button from '@material-ui/core/Button';


class ForgotPassword extends Component {
    render() {
        return (
            <div className="forgotPasswordCard flex-row">
                <Card>
                    <Row>
                        <Col>
                            <Navbar className="forgotBar">
                                <p>Forgot Password</p>
                            </Navbar>
                            <form>
                                <div className="grey-text p-2" >
                                    <Input label="Email" group type="email" icon="envelope" />
                                </div>
                                <div className="text-center">
                                    <Button className="forgotBtn" > Send Email </Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default ForgotPassword;