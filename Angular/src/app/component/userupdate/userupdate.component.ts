import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
  getId:any;
  updateForm!: FormGroup;
  issubmit: any;


  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charcode = (event.which) ? event.which : event.keyCode;

    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      console.log('charCode restricted is ' + charcode);
      return false;
    }
    return true;
  }


  constructor(private formBuilder: FormBuilder, private router: Router,
    private ngzone: NgZone, private activatedRoute: ActivatedRoute,
    private auth: AuthService) {

   this.getId = this.activatedRoute.snapshot.paramMap.get('id');
   this.auth.getUser(this.getId).subscribe(res=>{
    this.updateForm.setValue({
      firstname:res['firstname'],
      lastname:res['lastname'],
      gender:res['gender'],
      age:res['age'],
      address:res['address']  


    })
   });
   this.updateForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required, ]),
    age: new FormControl('', [Validators.required,Validators.maxLength(3) ]),
    address: new FormControl('', [Validators.required,]),
  })



  }

  ngOnInit(): void {

  }

  onUpdate(){
    this.auth.updateUser(this.getId,this.updateForm.value).subscribe(res=>{
      console.log("Data Update Successfully");
      this.router.navigate(['/main/userdata'])
    })
    if(this.auth.getToken()){
      this.router.navigate(['main/home']);
    }else{
      this.router.navigate([''])
    }
  }
  get firstname() {
    return this.updateForm.get('firstname')
  }
  get lastname() {
    return this.updateForm.get('lastname')
  }
  get gender() {
    return this.updateForm.get('gender')
  }
  get age() {
    return this.updateForm.get('age')
  }
  get address() {
    return this.updateForm.get('address')
  }
}
