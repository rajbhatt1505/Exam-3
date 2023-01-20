import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
  updateForm!: FormGroup;
  data:any;

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
//     this.getId = this.activatedRoute.snapshot.paramMap.get('id');
//     this.auth.get().subscribe(res => {
//       this.updateForm.setValue({
        
//       })
//     })

// this.updateForm = this.formBuilder.group({
//   firstname:[''],
// })
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      firstname: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
      ]),
      lastname: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
      ]),
      age: new FormControl("", [
          Validators.required,
      ]),
      gender: new FormControl("", [
          Validators.required,
      ]),
      address: new FormControl("",[
        Validators.required,
      ]),
  });
  }

get profile(){
  return this.updateForm.controls
}
get myform(){
  return this.updateForm;
}
readonly = true;
Onsubmit() {
  
    
  //  
      const form1: any = new FormData();
      form1.append('firstname', this.updateForm.get('firstname')?.value);
      form1.append('lastname', this.updateForm.get('lastname')?.value);
      form1.append('age', this.updateForm.get('age')?.value);
      form1.append('gender', this.updateForm.get('gender')?.value);
      form1.append('address', this.updateForm.get('address')?.value);
  
      var id:any=this.data._id
  
      this.auth.adduser(form1,).subscribe(
          (res:any) => {
              const data: any = res;
              alert(data.message);
              // console.log(data.message);
          },
          (err:any) => {
              console.log(err);
          }
      );
  
  this.auth.update(form1,id).subscribe((res)=>{
    console.log(res);
    this.router.navigate(["main/userdata"])
    
  })
  
  }

}
