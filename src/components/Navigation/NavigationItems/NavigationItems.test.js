import {configure, shallow} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter : new Adapter()}); //connect enzyme with our react app
//In describe funciton describe test for this component. // It() is for seprate test case // Expect is what we want from our test
describe('<NavigationItem/>', ()=>{
    let wrapper;
    //beforeEach executes befor each test case
    beforeEach ( ()=>{
        wrapper = shallow(<NavigationItems />); // shallow will render this component but not deeply rendered. Navigation item or any ohter child component as a place holders
    })
    it('should render two <NavigationItem /> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', ()=>{
        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contains one <NavigationItem link ="/logout" >Logout</NavigationItem> node if authenticated', ()=>{
        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.contains(<NavigationItem link ="/logout" >Logout</NavigationItem>)).toEqual(true);
    });
});