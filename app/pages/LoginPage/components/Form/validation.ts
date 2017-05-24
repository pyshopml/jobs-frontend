import {validate, string, util, number} from 'valid.js'

export const validateEmail = validate(
  util.isEmail,
  util.isRequired,
);

export const validatePassword = validate(
  util.isRequired,
);
