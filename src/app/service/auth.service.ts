import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data:any;

  isLoggedIn = true;

  constructor(private http:HttpClient,private router:Router) { }

  isAuthenticated(){
    return this.isLoggedIn;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  getToken():string | null{
    return localStorage.getItem('token');
  }

  signup(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/auth/register',data,{withCredentials:true});
  }
  signin(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/auth/login',data);
  }
  user():Observable<any>{
    const headers ={
      'Authorization':"Bearer" + localStorage.getItem('token')
    }
    return this.http.get('http://localhost:8080/auth/profile',{headers:headers})
  }

  adduser(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/auth/add-user',data,{withCredentials:true})
  }
  get(){
    return this.http.get('http://localhost:8080/auth/get',)
  }
  read(){
    return this.http.get('http://localhost:8080/auth/read/',)
  }

  del(data:any){
    return this.http.delete("http://localhost:8080/auth/delete-user/"+data)
   }
   update(data:any,id:any){
    return this.http.patch("http://localhost:8080/auth/update-user/"+id,data)
   }
}
