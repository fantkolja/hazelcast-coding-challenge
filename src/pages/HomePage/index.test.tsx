import { shallow } from 'enzyme';
import { HomePage } from './index';
import { Button } from '@material-ui/core';
import { RouterPath } from '../../constants';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const push = jest.fn();
  return {
    ...jest.requireActual('react-router-dom') as object,
    useHistory: () => ({
      push,
    }),
  };
});

describe('HomePage', () => {
  describe('with authenticated user', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      token: 'token',
    });
    const { push } = useHistory();
    const btnText = 'Go to Browser';
    const wrapper = shallow(
      <HomePage />
    );
    it(`renders "${btnText}" button`, () => {
      expect(wrapper.exists(Button)).toBe(true);
      const btn = wrapper.find(Button);
      expect(btn.text()).toBe(btnText);
    });
    it(`redirects to ${RouterPath.Browser} on "Go To Browser" click`, () => {
      wrapper.find(Button).simulate('click');
      expect(push).toBeCalledWith(RouterPath.Browser);
    });
  });

  describe('with not authenticated user', () => {
    const onAuthStart = jest.fn();
    jest.spyOn(React, 'useContext').mockReturnValue({
      token: '',
      onAuthStart,
    });
    const btnText = 'Sign in';
    const wrapper = shallow(
      <HomePage />
    );
    it(`renders "${btnText}" button`, () => {
      expect(wrapper.exists(Button)).toBe(true);
      const btn = wrapper.find(Button);
      expect(btn.text()).toBe(btnText);
    });
    it(`redirects to ${RouterPath.Browser} on "${btnText}" click`, () => {
      wrapper.find(Button).simulate('click');
      expect(onAuthStart).toHaveBeenCalledTimes(1);
    });
  });
});
