import {validate, string, util, number} from 'valid.js'

export const validateEmail = validate(
  util.isEmail,
  util.isRequired,
);

export const validatePasswords = (password, passwordConfirmation) => {
  return password === passwordConfirmation
      && validate(util.isRequired)(password)
};

export const validateUsername = validate(
  util.isRequired,
);
