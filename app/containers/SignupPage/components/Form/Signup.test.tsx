import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as expect from 'expect';

import SignupForm from './index';

describe('Signup form', () => {
  let 
    formWrapper, submitSpy, usernameInput,
    emailInput, passwordInput, passwordConfirmationInput, form,
    props = {
      handleSubmit: data => console.log(data),
      message: '',
      isLoading: false,
    };

  beforeEach(() => {
    submitSpy = expect.spyOn(props, 'handleSubmit');
    formWrapper = mount(<SignupForm {...props} />);

    usernameInput = formWrapper.find('input[name="username"]');
    emailInput = formWrapper.find('input[name="email"]');
    passwordInput = formWrapper.find('input[name="password"]');
    passwordConfirmationInput = formWrapper.find('input[name="passwordConfirmation"]');
    form = formWrapper.find('form');
  });

  it('submits entered data if all fields filled in', () => {
    usernameInput.simulate('change', { target: { value: 'John Doe' } });
    emailInput.simulate('change', { target: { value: 'usermail@gmail.com' } });
    passwordInput.simulate('change', { target: { value: '123123' } });
    passwordConfirmationInput.simulate('change', { target: { value: '123123' } });

    formWrapper.find('button').simulate('click');

    expect(submitSpy).toHaveBeenCalled();
  });

  it('do not submit entered data if at least one field is empty', () => {
    usernameInput.simulate('change', { target: { value: 'nikitos' }});
    emailInput.simulate('change', { target: { value: 'nikita.luparev@gmail.com' }});
    passwordInput.simulate('change', { target: { value: '123123' }});

    formWrapper.find('button').simulate('click');

    expect(submitSpy).toNotHaveBeenCalled();
  });
});