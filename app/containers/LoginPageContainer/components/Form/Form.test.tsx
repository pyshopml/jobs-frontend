import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as expect from 'expect';

import Form from './index';

describe('<Form />', () => {
  let formWrapper;
  let submitSpy;

  const props = {
    handleSubmit: data => console.log(data),
    message: 'error message',
    isLoading: false,
  };

  beforeEach(() => {
    submitSpy = expect.spyOn(props, 'handleSubmit');
    formWrapper = shallow(<Form {...props} />);
  });

  it('it has title', () => {
    expect(formWrapper.find('h2').text()).toEqual('Вход')
  });

  it('it has input fields', () => {
    expect(formWrapper.find('input').length).toEqual(2);
  });

  xdescribe('form input fields validation', () => {
    it('it cannot submit data if at least one field is not filled in', () => {

      formWrapper.setState({ email: 'user@mail.ru' });
      formWrapper.find('button').simulate('click');

      expect(submitSpy).toNotHaveBeenCalled();
    });

    it('it submit fields data only if all required data provided', () => {
      formWrapper.setState({ email: 'user@mail.ru', password: '123123' });
      formWrapper.find('form').simulate('submit', { preventDefault : () => {} });

      expect(submitSpy).toHaveBeenCalled();
    });

    it('it submits fields data when all fields are filled in', () => {
      const state = { email: 'user@mail.ru', password: '123123' }
      formWrapper.setState(state);
      formWrapper.find('form').simulate('submit', { preventDefault : () => {} });

      expect(submitSpy).toHaveBeenCalledWith(state);
    });
  });
});
