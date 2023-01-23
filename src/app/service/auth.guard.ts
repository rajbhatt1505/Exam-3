import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService){}
  canActivate(){

    if(this.auth.getToken()){
      return true;
    }else{
      alert('You are not Logged in ');
      return false;
    }
    
  }

    
}
