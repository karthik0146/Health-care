import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
 const token = localStorage.getItem('token');
 const newheaders=req.clone({
  setHeaders:{
    Authorization:`Bearer ${token}`
  }
 });
  return next(newheaders);
};
