import * as cookie from 'react-cookie'
import { IUser } from "interfaces";

const KEY = 'pyjobs/user';

export function getUserFromCookie () {
  return cookie.load(KEY) || null
};

export function setUserToCookie (user: IUser) {
  cookie.save(KEY, user)
};

export function removeUserFromCookie () {
  return cookie.remove(KEY)
};