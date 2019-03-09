import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

import './register.css'
class Register extends Component {

    state = {
        email: '',
        password: ''
    }
    render() {
        return (
            <div className='Register'>
                <Form>
                    <Form.Field>
                        <Input type='email' placeholder='Email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <Input type='password' placeholder='Password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </Form.Field>
                    <Button color='blue'>Register</Button>
                </Form>
            </div>
        )
    }
}

export default Register