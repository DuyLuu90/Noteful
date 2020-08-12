/*
import React from 'react'
import ReactDOM from 'react-dom'
//import { shallow } from 'enzyme'
//import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
//import Component

//const props = something

//USING RENDERER
/*
describe(`Component Test`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Component />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it ('Snapshot test-Prevent unexpected change', () => {
        const myRenderedElement= renderer.create(<Component />).toJSON();
        expect(myRenderedElement).toMatchSnapshot();
    })*/


//USING ENZYME
/*
    it('renders empty given no Component without errors', () => {
        const wrapper = shallow(<Component />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders the Component by default', () => {
        const wrapper = shallow(<Component props={props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('opens any clicked section', () => {
      const wrapper = shallow(<Component props={props} />)
      wrapper.find('button').at(1).simulate('click')
      //simulate a click event from the user 
      //at (1): the position of the button
      expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('only opens one section at a time', () => {
      const wrapper = shallow(<Component sections={note} />)
      wrapper.find('button').at(1).simulate('click')
      wrapper.find('button').at(2).simulate('click')
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})*/