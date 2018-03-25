import React from 'react';
import renderer from 'react-test-renderer';

import Button from './index.js';
import { mount } from 'enzyme';

describe('Button Component', function() {
  const onClickActionMock = jest.fn();
  const titleMock = "Test title";

  it('renders without crashing', () => {
    const tree = renderer
      .create(<Button  title={titleMock} onClick={onClickActionMock} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Correctly props', () => {
    const wrapper = mount(<Button  title={titleMock} onClick={onClickActionMock} />);
    expect(wrapper.props().title).toEqual(titleMock);
    expect(wrapper.props().onClick).toEqual(onClickActionMock);
  });
})


