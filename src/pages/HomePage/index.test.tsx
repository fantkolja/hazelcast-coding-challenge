import { shallow } from 'enzyme';
import { HomePage } from './index';
import { Button } from '@material-ui/core';

jest.mock('react-router-dom', () => {
  const push = jest.fn();
  return {
    ...jest.requireActual('react-router-dom') as object,
    useHistory: () => ({
      push,
    }),
  };
});
import { useHistory } from 'react-router-dom';
import { RouterPath } from '../../constants';
import React from 'react';
import { AuthContext } from '../../components/AuthProvider';

describe('<HomePage />', () => {
  it('renders "Go To Browser" button', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');
    const { push } = useHistory();
    const state = {
      token: 'token',
      onCodeReceive: jest.fn(),
      onAuthStart: jest.fn(),
    };
    const wrapper = shallow(
      <AuthContext.Provider value={state}>
        <HomePage />
      </AuthContext.Provider>
    );
    console.log(wrapper);
    wrapper.find(Button).simulate('click');
    expect(push).toBeCalledWith(RouterPath.Browser);
  });
});
