

import Cookies from 'js-cookie';

const COOKIE_NAME = 'jwt';

export const setCookie = (token: string) => {
  const expiryDate = new Date(new Date().getTime() + 3600 * 1000);
  Cookies.set(COOKIE_NAME, token, { expires: expiryDate }); 
};

export const getCookie = (): string | undefined => {
  return Cookies.get(COOKIE_NAME);
};

export const removeCookie = () => {
  Cookies.remove(COOKIE_NAME);
};
