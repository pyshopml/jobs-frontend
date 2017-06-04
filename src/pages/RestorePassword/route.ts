import { injectAsyncReducer } from 'store';
import { matchWhenNotAuthed } from "routes";

export default (store) => ({
  path: 'restore_password',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/RestorePassword'),
      System.import('pages/RestorePassword/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'restorePassword', reducer.default);
      cb(null, component.default);
    });
  },
  onEnter: matchWhenNotAuthed(store)
})

