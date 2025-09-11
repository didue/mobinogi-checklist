import { CanMatchFn } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  const loggedIn = !!localStorage.getItem('token');
  if (!loggedIn) alert('로그인이 필요합니다!');
  return loggedIn;
};
