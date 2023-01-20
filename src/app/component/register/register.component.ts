import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-regi',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerform!: FormGroup;
  issubmit: any;
  data: any;
  message: any;


  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charcode = (event.which) ? event.which : event.keyCode;

    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      console.log('charCode restricted is ' + charcode);
      return false;
    }
    return true;

  }

  constructor(private router: Router, private auth: AuthService) {
    this.registerform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'), Validators.minLength(8), Validators.maxLength(18)]),
      token:new FormControl('',[])
    })
  }



  ngOnInit(): void { }

  register() {

    this.issubmit = true;
    this.data = this.registerform.value
    // console.log(this.data);
    if (this.registerform.value) {
   
      this.auth.signup(this.data).subscribe((data)=>{
       if(data.success == true){
        console.log(data);
        
        alert('successfull')
       }else{
        alert('failed')
       }
      })

      
    }
  }




  get username() {
    return this.registerform.get('username')
  }
  get name() {
    return this.registerform.get('name')
  }
  get email() {
    return this.registerform.get('email')
  }
  get password() {
    return this.registerform.get('password')
  }
  get mobile() {
    return this.registerform.get('mobile')
  }

}
