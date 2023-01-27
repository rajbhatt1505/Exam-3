import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { retry } from 'rxjs';



@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  audioForm!:FormGroup;
  issubmit:any;
  data:any;
  message:any;
  

  constructor(private router: Router, private auth: AuthService) { 
    this.audioForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, ]),
      file: new FormControl('', [Validators.required]),
      // song:new FormControl('',[Validators.required])
    })
  }
  get myForm(){
    return this.audioForm
  }
  ngOnInit(): void {
  }

  audio(){
    const form1: any = new FormData();
    form1.append('file', this.ChangeEvt);
    form1.append('name', this.myForm.get('name')?.value);
    form1.append('description', this.myForm.get('description')?.value);
    // form1.append('song', this.ChangeEvt);

   
    this.issubmit = true;
    this.data = this.audioForm.value
    console.log(this.data);
    if(this.audioForm.value){
      console.log(this.audioForm.value);
      this.auth.audio(form1).subscribe((data:any)=>{
        console.log(data);
        
         if(data.success==true){

           alert('Song Added ')
           this.router.navigate(['main/audiodata'])
           this.audioForm.reset()

         }else{
          alert('failed')
         }
        //  this.message=data;

      });
      
    }
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
    return this.audioForm.get('name')
   }
   get description(){
    return this.audioForm.get('description')
   }
   get file(){
     return this.audioForm.get('file')
   }
}
