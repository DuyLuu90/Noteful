
import React from 'react'
import ReactDOM from 'react-dom'
//import { shallow } from 'enzyme'
//import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import NoteContent from './NoteContent'

describe(`NoteContent Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<NoteContent />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it ('Snapshot test-Prevent unexpected change', () => {
        const myRenderedElement1= renderer.create(<NoteContent />).toJSON();
        expect(myRenderedElement1).toMatchSnapshot();
    })

/*  it('renders empty given no NoteContent without errors', () => {
        const wrapper = shallow(<NoteContent />)
        expect(toJson(wrapper)).toMatchSnapshot()
    }) */
})