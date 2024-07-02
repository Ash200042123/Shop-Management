

import Cookies from 'js-cookie';

const COOKIE_NAME = 'jwt';

export const setCookie = (token: string) => {
  Cookies.set(COOKIE_NAME, token, { expires: 1 }); 
};

export const getCookie = (): string | undefined => {
  return Cookies.get(COOKIE_NAME);
};

export const removeCookie = () => {
  Cookies.remove(COOKIE_NAME);
};
