import { Injectable, Injector } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService {

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: any, next: any) {
    req = this.addAuthHeader(req);
    return next.handle(req);
  }
  addAuthHeader(req: any) {
    const tokenservice = this.injector.get(TokenService)
    let token = tokenservice.get();
    if (token) {
      // append the access token to the request header
      return req.clone({
        setHeaders: {
          'token': token
        }
      });
    }
    else {
      this.router.navigate([''])
    }
    return req;
  }
}