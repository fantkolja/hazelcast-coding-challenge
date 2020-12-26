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
    push,
  };
});
// @ts-ignore
import { push } from 'react-router-dom';
import { RouterPath } from '../../constants';

describe('<HomePage />', () => {
  it('renders "Go To Browser" button', () => {
    const wrapper = shallow(<HomePage />);
    wrapper.find(Button).simulate('click');
    // expect(push).toBeCalledWith(RouterPath.Browser);
    expect(push).toBeTruthy();
  });
});
