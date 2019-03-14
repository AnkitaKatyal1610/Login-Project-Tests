import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { Homepage } from './homepage';

Enzyme.configure({ adapter: new Adapter() })
let props = {
    getUsersAction: jest.fn(),
    token: "abcd",
    users: [],
    logoutAction: jest.fn(),
    history: {
        replace: jest.fn()
    }
}

let wrapper;
beforeEach(() => {
    wrapper = shallow(<Homepage {...props} />)
})

describe('Testing Component Homepage', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<Homepage {...props} />).toJSON();
        expect(tree).toMatchSnapshot();

    })
    it('has welcome text for the logged in user', () => {
        let welcomeText = wrapper.find('h2').text();
        expect(welcomeText).toBe("Welcome, you have logged in successfully");
    })

    it('has a logout button', () => {
        let button = wrapper.find('Button');
        expect(button.length).toEqual(1);
        expect(button.prop('children')).toBe('Logout');
    })

    it('calls action to display users when the component mounts', () => {
        expect(props.getUsersAction).toHaveBeenCalled();
    })
    it('displays a table with user information', () => {
        let tables = wrapper.find('Table');
        expect(tables.length).toEqual(1)
    })

    it('displays a pagination component', () => {
        let pages = wrapper.find('Pagination');
        expect(pages.length).toEqual(1);
    })

    it('changes page number in state when page button is clicked and calls action to get users of that page', () => {
        let pages = wrapper.find('Pagination');
        pages.prop('onPageChange', { data: { activePage: 3 } })
        let page = pages.prop('activePage');
        expect(wrapper.state().page).toEqual(page);
        expect(props.getUsersAction).toHaveBeenCalled();
    })

    it('calls onClick handler when logout button is clicked', () => {
        let spy = jest.spyOn(wrapper.instance(), 'logoutClicked')
        wrapper.update();
        wrapper.instance().forceUpdate();
        let button = wrapper.find('Button');
        button.simulate('click');
        expect(spy).toHaveBeenCalled();
    })

    it('calls logout action when logout button is clicked', () => {
        let button = wrapper.find('Button');
        button.simulate('click');
        expect(props.logoutAction).toHaveBeenCalled();
    })
})