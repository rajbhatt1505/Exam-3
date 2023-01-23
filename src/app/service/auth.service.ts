import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError, from, map, Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import {user} from './user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data:any;

  isLoggedIn = true;

  REST_API: string = "http://localhost:8080/auth";
  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private httpClient:HttpClient,private router:Router) { }




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
    return this.httpClient.post('http://localhost:8080/auth/register',data,{withCredentials:true});
  }
  signin(data:any):Observable<any>{
    return this.httpClient.post('http://localhost:8080/auth/login',data);
  }
  user():Observable<any>{
    const headers ={
      'Authorization':"Bearer" + localStorage.getItem('token')
    }
    return this.httpClient.get('http://localhost:8080/auth/profile',{headers:headers})
  }

  // adduser(data:any):Observable<any>{
  //   return this.http.post('http://localhost:8080/auth/add-user',data,{withCredentials:true})
  // }
  // get(){
  //   return this.http.get('http://localhost:8080/auth/get',)
  // }
  // read(id: any): Observable<any> {
  //   let API_URL = `${this.REST_API}/read-book/${id}`;
  //   return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
  //     return res || {}
  //   }),
  //     catchError(this.handleError)
  //   )
  // }

  // del(data:any){
  //   return this.http.delete("http://localhost:8080/auth/delete-user/"+data)
  //  }
  //  update(data:any,id:any){
  //   return this.http.put("http://localhost:8080/auth/update-user/"+id,data)
  //  }


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
