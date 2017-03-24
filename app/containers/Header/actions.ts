import { push } from 'react-router-redux';
import { Action } from '../../interfaces';

export const redirectTo = (path: string) => dispatch => dispatch(push(path));
