import { push } from 'react-router-redux';
import { Action } from '../../interfaces';

export const redirectToSignup = (path: string) => dispatch => dispatch(push(path));
