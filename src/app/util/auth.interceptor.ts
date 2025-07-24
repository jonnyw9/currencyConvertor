import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  //In the real world I would not hard code this and it would be JWT or on a proxy server.
  const TOKEN = 'CykoFkj2JoP9rIeDZvwzaMrEWUGV1DnC';

  console.log("here");
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
  return next(authReq);
};
