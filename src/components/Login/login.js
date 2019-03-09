import React, { Component } from 'react';
import { Input, Button, Form, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import { loginAction } from '../../action/action'
import './login.css'

export class Login extends Component {

    state = {
        email: '',
        password: '',
        submitted: false
    }
    handleSubmit = () => {
        this.setState({ submitted: true })
        let { email, password } = this.state;
        if (email !== '' && password !== '') {
            this.props.loginAction({ email, password }).then(() => {
                if (localStorage.getItem('token'))
                    this.props.history.replace('/homepage');
            });
        }
    }

    render() {
        return (
            <div className='Login'>
                <Form>
                    <Form.Field>
                        <Input value={this.state.email} icon='user circle' iconPosition='left' type='email' onChange={(event) => { this.setState({ email: event.target.value, submitted: false, invalid: false }) }} placeholder='Email' />
                        {this.state.submitted && this.state.email === '' ? <Label color='red' pointing>Please enter your email</Label> : null}
                    </Form.Field>
                    <Form.Field>
                        <Input value={this.state.password} icon='lock' iconPosition='left' type='password' onChange={(event) => { this.setState({ password: event.target.value, submitted: false }) }} placeholder='Password' />
                        {this.state.submitted && this.state.password === '' && this.state.email !== '' ? <Label color='red' pointing>Please enter your password</Label> : null}
                    </Form.Field>
                    <Button onClick={this.handleSubmit} color='blue'>Login</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        loginAction: bindActionCreators(loginAction, dispatch)
    }
}
export default withRouter(connect(null, mapDispatch)(Login));