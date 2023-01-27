import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError, from, map, Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import {user} from './user'
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data:any;

  isLoggedIn = true;

  REST_API: string = "http://localhost:8080/auth";
  API: string = "http://localhost:8080/auth/audioget";

  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private httpClient:HttpClient,private router:Router) { }
  
  get isUserLoggedIN(){
    return false;
  }



  isAuthenticated(){
    return this.isLoggedIn;
  }

  logout(){
    localStorage.removeItem('token');
    
    this.router.navigate(['']);
  }
  getToken(){
    return localStorage.getItem('token');
  }

  signup(data:any):Observable<any>{
    return this.httpClient.post('http://localhost:8080/auth/register',data,{withCredentials:true});
  }
  signin(data:any):Observable<any>{
    return this.httpClient.post('http://localhost:8080/auth/login',data);
  }

  getProfile():Observable<any>{
    const headers ={
      'Authorization':"Bearer" + localStorage.getItem('token')
    }
    return this.httpClient.get('http://localhost:8080/auth/profile',{withCredentials:true})
  }
  get(){
    return this.httpClient.get('http://localhost:8080/auth/get',{withCredentials:true})
  }

  profile(data:any){
   return this.httpClient.post("http://localhost:8080/auth/Profileget",data)
  }
  
  del(data:any){
   return this.httpClient.delete("http://localhost:8080/auth/delete/"+data)
  }
  update(data:any,id:any){
   return this.httpClient.patch("http://localhost:8080/auth/update/"+id,data)
  }

  adduser(data:user):Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
  }

  getUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  getUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
      return res || {}
    }),
      catchError(this.handleError)
    )
  }
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }
// audio 
audio(data:any):Observable<any>{
  return this.httpClient.post('http://localhost:8080/auth/audio',data,{withCredentials:true});
}

readaudio(){
  return this.httpClient.get(this.API)
}
getaudio(id: any): Observable<any> {
  let API_URL = `${this.REST_API}/read-audio/${id}`;
  return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
    return res || {}
  }),
    catchError(this.handleError)
  )
}
  delaudio(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-audio/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  audioupdate(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }
   handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
     errorMessage =  error.error.message;
  } else {
       errorMessage = `Error Code: ${error.status}\nMessage: $(error.message)`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
  
  }
}
