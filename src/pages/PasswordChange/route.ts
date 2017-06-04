import { injectAsyncReducer } from 'store';
import { matchWhenNotAuthed } from "routes";

export default (store) => ({
  path: 'account/:uid/password-reset/:token/',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/PasswordChange'),
      System.import('pages/PasswordChange/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'passwordChange', reducer.default);
      cb(null, component.default);
    });
  },
  onEnter: matchWhenNotAuthed
})

