import { injectAsyncReducer } from 'store';
import { matchWhenAuthed } from 'routes';

export default (store) => ({
  path: 'vacancies/new',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/NewVacancy'),
      System.import('pages/NewVacancy/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'newVacancy', reducer.default);
      cb(null, component.default);
    })
  },
  onEnter: matchWhenAuthed(store)
})

