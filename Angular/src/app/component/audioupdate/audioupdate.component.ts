import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-audioupdate',
  templateUrl: './audioupdate.component.html',
  styleUrls: ['./audioupdate.component.css']
})
export class AudioupdateComponent implements OnInit {
  getId:any;
  updateForm!: FormGroup;
  issubmit: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private ngzone: NgZone, private activatedRoute: ActivatedRoute,
    private auth: AuthService) {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.auth.getaudio(this.getId).subscribe(res=>{
       this.updateForm.setValue({
         name:res['name'],
         description:res['description'],
        //  file:res['file'],
        //  song:res['song'],
   
   
       })
      });
      this.updateForm = new FormGroup({
       name: new FormControl('', [Validators.required]),
       description: new FormControl('', [Validators.required,]),
      //  file: new FormControl('', [Validators.required, ]),
      //  song: new FormControl('', [Validators.required ]),
     })
     }

  ngOnInit(): void {
  }
  audio(){
    this.auth.updateaudio(this.getId,this.updateForm.value).subscribe(res=>{
      console.log("Data Update Successfully");
      this.router.navigate(['/main/audiodata'])
    })
  }
  base64img:any;
  ChangeEvt : any 
  onFileChange(event:any){
    this.ChangeEvt = event.target.files[0];
    var files = event.target.files;
    var file = files[0];
this.ChangeEvt=file
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
    console.log(this.ChangeEvt)
  }
  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
           this.base64img='data:image/png;base64,'+ btoa(binaryString);
           console.log(this.base64img);
   }
   get name(){
    return this.updateForm.get('name')
   }
   get description(){
    return this.updateForm.get('description')
   }
   get file(){
     return this.updateForm.get('file')
   }
}
