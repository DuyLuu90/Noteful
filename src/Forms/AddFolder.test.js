
import React from 'react'
import ReactDOM from 'react-dom'
//import { shallow } from 'enzyme'
//import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import AddFolder from './AddFolder'

//const folders = []

describe(`AddFolder Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<AddFolder />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it ('Snapshot test-Prevent unexpected change', () => {
        const myRenderedElement1= renderer.create(<AddFolder />).toJSON();
        expect(myRenderedElement1).toMatchSnapshot();
    })

/* 
    it('renders empty given no AddFolder without errors', () => {
        const wrapper = shallow(<AddFolder />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders the no sections by default', () => {
        const wrapper = shallow(<AddFolder note={note} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

  it('opens any clicked section', () => {
    const wrapper = shallow(<AddFolder sections={note} />)
    wrapper.find('button').at(1).simulate('click')
    //simulate a click event from the user 
    //at (1): the position of the button
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('only opens one section at a time', () => {
    const wrapper = shallow(<AddFolder sections={note} />)
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('button').at(2).simulate('click')
    expect(toJson(wrapper)).toMatchSnapshot()
  })*/
})