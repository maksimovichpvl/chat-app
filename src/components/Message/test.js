import React from 'react';
import renderer from 'react-test-renderer';

import Message from './index.js';
import { mount } from 'enzyme';

describe('Message Component', function() {
  const usernameMock = "Test username";
  const message = {
    username: usernameMock
  };

  it('renders without crashing', () => {
    const tree = renderer
      .create(<Message  username={usernameMock} message={message} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Correctly props', () => {
    const wrapper = mount(<Message username={usernameMock} message={message} />);
    expect(wrapper.props().username).toEqual(usernameMock);
    expect(wrapper.props().message).toEqual(message);
  });

  it('Correctly classNames', () => {
    const wrapper = mount(<Message username={usernameMock} message={message} />);
    expect(wrapper.find('.message--my').length).toEqual(2);
  });
})


