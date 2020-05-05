
import React from 'react'
import ReactDOM from 'react-dom'
//import { shallow } from 'enzyme'
//import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import AddNote from './AddNote'
/*
const note = {
    "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
    "name": "Dogs",
    "modified": "2019-01-03T00:00:00.000Z",
    "folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
    "content": "Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi. Suscipit totam delectus ut voluptas aut qui rerum. Non veniam eius molestiae rerum quam.\n \rUnde qui aperiam praesentium alias. Aut temporibus id quidem recusandae voluptatem ut eum. Consequatur asperiores et in quisquam corporis maxime dolorem soluta. Et officiis id est quia sunt qui iste reiciendis saepe. Ut aut doloribus minus non nisi vel corporis. Veritatis mollitia et molestias voluptas neque aspernatur reprehenderit.\n \rMaxime aut reprehenderit mollitia quia eos sit fugiat exercitationem. Minima dolore soluta. Quidem fuga ut sit voluptas nihil sunt aliquam dignissimos. Ex autem nemo quisquam voluptas consequuntur et necessitatibus minima velit. Consequatur quia quis tempora minima. Aut qui dolor et dignissimos ut repellat quas ad."
  }*/

describe(`AddNote Component`, () => {
    it ('Smoke Test-Render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<AddNote />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it ('Snapshot test-Prevent unexpected change', () => {
        const myRenderedElement1= renderer.create(<AddNote />).toJSON();
        expect(myRenderedElement1).toMatchSnapshot();
    })

/*
    it('renders empty given no AddNote without errors', () => {
        const wrapper = shallow(<AddNote />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders the no sections by default', () => {
        const wrapper = shallow(<AddNote note={note} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

  it('opens any clicked section', () => {
    const wrapper = shallow(<AddNote sections={note} />)
    wrapper.find('button').at(1).simulate('click')
    //simulate a click event from the user 
    //at (1): the position of the button
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('only opens one section at a time', () => {
    const wrapper = shallow(<AddNote sections={note} />)
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('button').at(2).simulate('click')
    expect(toJson(wrapper)).toMatchSnapshot()
  })*/
})