import { replace } from 'react-router-redux'
import apiGetOneVacancy from 'api/vacancies/getOne';
import { LOAD_VACANCY } from './constants';

export const loadVacancy = (id: number) => (dispatch) => {
  dispatch({
    type: LOAD_VACANCY,
    payload: apiGetOneVacancy(id)
  }).catch((msg) => {
      if(msg == 'Not found') dispatch(replace('/404'))
    })
}

