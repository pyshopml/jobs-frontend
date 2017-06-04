import { injectAsyncReducer } from 'store';

export default (store) => ({
  path: 'vacancies/:id',
  getComponent:(location, cb) => {
    Promise.all([
      System.import('pages/VacancyDetail'),
      System.import('pages/VacancyDetail/reducer')
    ]).then(([component, reducer]) => {
      injectAsyncReducer(store, 'vacancyDetail', reducer.default);
      cb(null, component.default);
    });
  },
})
