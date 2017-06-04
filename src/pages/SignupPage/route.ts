import { injectAsyncReducer } from 'store';
import { matchWhenNotAuthed } from "routes";

export default (store) => ({
  path: 'signup',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/SignupPage'),
      System.import('pages/SignupPage/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'signupPage', reducer.default);
      cb(null, component.default);
    });
  },
  onEnter: matchWhenNotAuthed
})

