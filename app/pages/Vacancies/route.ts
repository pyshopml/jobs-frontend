import { injectAsyncReducer } from 'store';

export default (store) => ({
  path: 'vacancies',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/Vacancies'),
      System.import('pages/Vacancies/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'vacancies', reducer.default);
      cb(null, component.default);
    })
  }
})

