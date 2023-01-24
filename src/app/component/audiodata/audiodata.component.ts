import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service'

@Component({
  selector: 'app-audiodata',
  templateUrl: './audiodata.component.html',
  styleUrls: ['./audiodata.component.css']
})
export class AudiodataComponent implements OnInit {
  data:any = [];

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.readaudio().subscribe((res)=>{
      this.data=res
      console.log(this.data);
      
          })
  }
  del(id: any, i: any) {
    console.log(id);
    if (window.confirm('Are You Sure want to Delete It')) {
      this.auth.deleteUser(id).subscribe(res => {
        this.data.splice(i, 1);
      })
    }
  }

}
