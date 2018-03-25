import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import App from './index.js';
import { mount } from 'enzyme';
import Chat from '../Chat';
import '../../../testHelpers/localStorageMock';


describe('App Component', function() {
  it('renders without crashing', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Has child component "Chat"', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('.chat').length).toEqual(1);
  });
})


