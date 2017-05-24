import {validate, string, util, number} from 'valid.js'

export const validateTitle = validate(
  util.isRequired,
  string.maxLength(128)
);

export const validateDescription = validate(
  util.isRequired,
  string.maxLength(100)
);


export const validateCategory = validate(
  util.isRequired,
  number.isNumber
);
