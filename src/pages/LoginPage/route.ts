import { injectAsyncReducer } from 'store';
import { matchWhenNotAuthed } from "routes";

export default (store) => ({
  path: 'login',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/LoginPage'),
      System.import('pages/LoginPage/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'loginPage', reducer.default);
      cb(null, component.default);
    });
  },
  onEnter: matchWhenNotAuthed(store)
})

