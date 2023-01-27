import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userform!: FormGroup;
  issubmit: any;
  data: any;

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charcode = (event.which) ? event.which : event.keyCode;

    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      console.log('charCode restricted is ' + charcode);
      return false;
    }
    return true;

  }
  constructor(private router: Router, private auth: AuthService) { 
    this.userform = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      gender: new FormControl('', [Validators.required, ]),
      age: new FormControl('', [Validators.required,Validators.maxLength(3) ]),
      address: new FormControl('', [Validators.required,]),
    })
  }

  ngOnInit(): void {
  }

  user() {

    this.issubmit = true;
    this.data = this.userform.value
    // console.log(this.data);
    if (this.userform.value) {
   
      this.auth.adduser(this.data).subscribe((data)=>{
       if(data.success == true){
        console.log(data);
        
        alert('successfull')
        this.router.navigate(['main/userdata'])
       }else{
        alert('failed')
       }
      })

      
    }
 
  }

  get Profile() {
    return this.userform.controls;
}
get myform() {
    // console.log(this.myForm);
    return this.userform;
}
readonly = true;



  get firstname() {
    return this.userform.get('firstname')
  }
  get lastname() {
    return this.userform.get('lastname')
  }
  get gender() {
    return this.userform.get('gender')
  }
  get age() {
    return this.userform.get('age')
  }
  get address() {
    return this.userform.get('address')
  }
}
