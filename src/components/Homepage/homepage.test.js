import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Homepage } from './homepage';

Enzyme.configure({ adapter: new Adapter() })

let wrapper;
beforeEach(() => {
    wrapper = shallow(<Homepage />)
})

describe('Testing Component Homepage', () => {
    it('has welcome text for the logged in user', () => {
        let welcomeText = wrapper.find('h2').text();
        expect(welcomeText).toBe("Welcome, you have logged in successfully");
    })

    it('has a logout button', () => {
        let button = wrapper.find('Button');
        expect(button.length).toEqual(1);
        expect(button.prop('children')).toBe('Logout');
    })

    it('displays a table with user information', () => {
        let tables = wrapper.find('Table');
        expect(tables.length).toEqual(1)
    })
    it('calls onClick handler when logout button is clicked', () => {
        let spy = jest.spyOn(wrapper.instance(), 'logoutClicked')
        wrapper.update();
        wrapper.instance().forceUpdate();
        let button = wrapper.find('Button');
        button.simulate('click');
        expect(spy).toHaveBeenCalled();
    })
})