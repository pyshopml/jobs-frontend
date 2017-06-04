import {validate, util, isValid } from 'valid.js';

export const validateLinkText = validate(
  util.isRequired,
);

export const validateLinkUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+.[a-z]{2,})'+ // domain name
    '(\\/[-a-z\\d%_.~+]*)*'+ // path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  return isValid(url, [util.isRequired]) && pattern.test(url)
};
