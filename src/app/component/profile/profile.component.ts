import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   data:any;
// className: string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined;
message: any;
issubmit: any;


  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getProfiles();
  }
   getProfiles(){
    this.auth.getProfile().subscribe((res)=>{
      if(res){
        this.data = res.data;
        console.log(this.data);
        this.getProfile.patchValue({
          username:this.data.username,
          name: this.data.name,
          email: this.data.email,
          mobile: this.data.mobile,
          password: this.data.password
        });
        // this.data.run(() => this.router.navigateByUrl('/user'))

  
      }else{
        // this.logout()
      }
    },err =>{

    })
  }
   

 
imageSrc:any;
datas: any = {};
filename = '';
imginfile: any;
Userprofile: any = {};
imageChangedEvent: any = '';
croppedImage: any = '';
file_image: any;

UserData: any;


getProfile = new FormGroup({
    image_file: new FormControl(''),
    username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
    ]),
    name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
    ]),
    email: new FormControl("", [
        Validators.required,
        Validators.email,
    ]),
    mobile: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    password: new FormControl(''),
    // _id : new FormControl(""),
});

 fileChangeEvent(event: any): void {
        // (document.getElementById('popup') as HTMLElement).style.display =
        //     'block';
        this.imageChangedEvent = event;
        
      }

get Profile() {
    return this.getProfile.controls;
}
get myform() {
    // console.log(this.myForm);
    return this.getProfile;
}
readonly = true;

Onsumit() {
  if(this.auth.getToken()){
    this.router.navigate(['main/home']);
  }else{
    this.router.navigate([''])
  }
    

    const form1: any = new FormData();
    form1.append('image', this.imgChangeEvt);
    form1.append('username', this.getProfile.get('username')?.value);
    form1.append('name', this.getProfile.get('name')?.value);
    form1.append('email', this.getProfile.get('email')?.value);
    form1.append('mobile', this.getProfile.get('mobile')?.value);
    form1.append('password', this.getProfile.get('password')?.value);

    form1.append('Src', this.base64img);

    console.log(this.base64img);
    var id:any=this.data._id

    this.auth.profile(form1,).subscribe(
        (res:any) => {
            const data: any = res;
            
            // console.log(data.message);
        },
        (err:any) => {
            console.log(err);
        }
        
    );

this.auth.update(form1,id).subscribe((res)=>{
  console.log(res);
  alert("Profile Update successfull");
  this.router.navigate(["main/userdata"])
  
})

}

base64img:any;
  imgChangeEvt : any = '';
  onFileChange(event:any){
    this.imgChangeEvt = event.target.files[0];
    var files = event.target.files;
    var file = files[0];

    // console.log(this.base64img);
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
    console.log(this.imgChangeEvt)
  }
  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
           this.base64img='data:image/png;base64,'+ btoa(binaryString);
           this.imageSrc=this.base64img
           console.log(this.base64img);
   }


  get username() {
    return this.getProfile.get('username')
  }
  get name() {
    return this.getProfile.get('name')
  }
  get email() {
    return this.getProfile.get('email')
  }
  get password() {
    return this.getProfile.get('password')
  }
  get mobile() {
    return this.getProfile.get('mobile')
  }

}