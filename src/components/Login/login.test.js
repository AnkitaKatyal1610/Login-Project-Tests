import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './login';

Enzyme.configure({ adapter: new Adapter() });

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 500);
});

describe('login component', () => {
    let props = {
        loginAction: jest.fn(() => promise)

    };
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Login {...props} />);
    })
    it('has two text inputs', () => {
        const textInputs = wrapper.find('Input')
        expect(textInputs.length).toEqual(2);
    })

    it('has a login button', () => {
        const buttons = wrapper.find('Button');
        expect(buttons.length).toEqual(1);
        expect(buttons.prop('children')).toBe('Login');
    })

    it('has initial state empty', () => {
        const { email, password } = wrapper.state();
        expect(email).toBe("");
        expect(password).toBe("");
    })

    it('changes the state on change event in the input fields', () => {
        const emailInput = wrapper.find('Input[type="email"]')
        const passwrdInput = wrapper.find('Input[type="password"]')
        emailInput.simulate('change', {
            target: { value: 'test@test.com' }
        })
        passwrdInput.simulate('change', {
            target: { value: 'test' }
        })
        const { email, password } = wrapper.state();
        expect(email).toBe("test@test.com");
        expect(password).toBe("test");
    })

    it('calls onClick event handler when Login button is clicked', () => {
        let spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
        wrapper.update();
        wrapper.instance().forceUpdate();
        const button = wrapper.find('Button');
        button.simulate('click');
        expect(spy).toHaveBeenCalled();
    })
    it('does not call login action if email and password are not given', () => {
        expect(wrapper.state().email).toBe('')
        expect(wrapper.state().password).toBe('')
        const button = wrapper.find('Button');
        button.simulate('click');
        expect(props.loginAction).toHaveBeenCalledTimes(0)
    })
    it('calls login action when email and password are set', () => {
        const emailInput = wrapper.find('Input[type="email"]')
        const passwrdInput = wrapper.find('Input[type="password"]')
        emailInput.simulate('change', {
            target: { value: 'test@test.com' }
        })
        passwrdInput.simulate('change', {
            target: { value: 'test' }
        })
        const button = wrapper.find('Button');
        button.simulate('click');
        expect(props.loginAction).toHaveBeenCalled()
    })


})
