import { mount } from 'enzyme';
import Title from '../components/title/title';
import React from 'react';

/** @test {Title Component} */
test('Title component', () => {
  const wrapper = mount(<h1>title</h1>);
  expect(wrapper.text()).toMatch('title')
})