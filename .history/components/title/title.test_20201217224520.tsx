import { shallow } from 'enzyme';

import Title from './title';

/** @test {Title Component} */
describe('Title Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Title />);

    expect(wrapper.find('h1')).toHaveLength(0);
  });
});