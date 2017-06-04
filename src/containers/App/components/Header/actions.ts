import { push } from 'react-router-redux';

export const redirectTo = (path: string) => dispatch => dispatch(push(path));
