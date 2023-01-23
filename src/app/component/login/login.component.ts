import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  data:any;
  type:any;
  msg:any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // this.router.navigate(['main'])

    // if(this.auth.isAuthenticated()){
    // }
  }
  login(){
    // alert("Login Success")
    const data = this.loginForm.value;

    this.auth.signin(data).subscribe((res)=>{
      this.cookieService.set('token',res.token);
      if(res.success == true){
      alert('Login successfull!!')
        localStorage.setItem('token', res.token)
        this.router.navigate(['/main/profile'])
      }else{
      alert(res. message)
      }
    },err=>{
      alert("Login faild !!")
    })

 
  }
}

