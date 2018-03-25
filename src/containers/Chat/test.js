import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import io from 'socket.io-client';

import Chat from './index.js';
import { mount } from 'enzyme';
import '../../../testHelpers/localStorageMock';


describe('Chat Component', function() {
  it('renders without crashing', () => {
    const tree = renderer
      .create(<Chat />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Has child component "Button"', () => {
    const wrapper = mount(<Chat />);
    expect(wrapper.find(".btn.btn-primary").length).toEqual(1);
  });

})


