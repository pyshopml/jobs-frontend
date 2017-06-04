import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as expect from 'expect';

import SignupForm from './index';

describe('Signup form', () => {

  describe('submits data', () => {
    let
      formWrapper,
      submitSpy,
      props = {
        handleSubmit: data => console.log(data),
        message: '',
        isLoading: false,
      };

    submitSpy = expect.spyOn(props, 'handleSubmit');
    formWrapper = mount(<SignupForm {...props} />);

    let usernameInput = formWrapper.find('input[name="username"]');
    let emailInput = formWrapper.find('input[name="email"]');
    let passwordInput = formWrapper.find('input[name="password"]');
    let passwordConfirmationInput = formWrapper.find('input[name="passwordConfirmation"]');

    it('only if all fields are filled in', () => {
      usernameInput.simulate('change', { target: { name: 'username', value: 'John Doe' } });
      emailInput.simulate('change', { target: { name: 'email', value: 'usermail@gmail.com' } });
      passwordInput.simulate('change', { target: { name: 'password', value: '123123' } });
      passwordConfirmationInput.simulate('change', { name: 'passwordConfirmation', target: { value: '123123' } });

      formWrapper.find('button').get(0).click();

      expect(submitSpy).toHaveBeenCalled();
    });

  });

  describe('does not submit', () => {
    let
      formWrapper,
      submitSpy,
      props = {
        handleSubmit: data => console.log(data),
        message: '',
        isLoading: false,
      };

    submitSpy = expect.spyOn(props, 'handleSubmit');
    formWrapper = mount(<SignupForm {...props} />);

    let usernameInput = formWrapper.find('input[name="username"]');
    let emailInput = formWrapper.find('input[name="email"]');
    let passwordInput = formWrapper.find('input[name="password"]');
    let passwordConfirmationInput = formWrapper.find('input[name="passwordConfirmation"]');


    it('data if at least one field is empty', () => {
      usernameInput.simulate('change', { target: { name: 'username', value: 'John Doe' } });
      emailInput.simulate('change', { target: { name: 'email', value: 'usermail@gmail.com' } });
      passwordInput.simulate('change', { target: { name: 'password', value: '123123' } });

      formWrapper.find('button').get(0).click();

      expect(submitSpy).toNotHaveBeenCalled();
    });

  });

});