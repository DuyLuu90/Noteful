
import React from 'react'
import ReactDOM from 'react-dom'
//import { shallow } from 'enzyme'
//import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import Main from './Main'

describe(`Main Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Main />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it ('Snapshot test-Prevent unexpected change', () => {
        const myRenderedElement1= renderer.create(<Main />).toJSON();
        expect(myRenderedElement1).toMatchSnapshot();
    })

/*  it('renders empty given no Main without errors', () => {
        const wrapper = shallow(<Main />)
        expect(toJson(wrapper)).toMatchSnapshot()
    }) */
})