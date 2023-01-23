import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  get(){
    return localStorage.getItem('token');
  }
  remove(){
    return localStorage.removeItem('token');
  }
}
