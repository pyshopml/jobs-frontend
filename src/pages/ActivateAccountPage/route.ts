import { injectAsyncReducer } from 'store';
import { matchWhenNotAuthed } from  'routes';

export default (store) => ({
  path: 'account/:uid/activate/:token',
  getComponent: (location, cb) => {
    Promise.all([
      System.import('pages/ActivateAccountPage'),
      System.import('pages/ActivateAccountPage/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'accountActivation', reducer.default);
      cb(null, component.default);
    });
  },
  onEnter: matchWhenNotAuthed
})

