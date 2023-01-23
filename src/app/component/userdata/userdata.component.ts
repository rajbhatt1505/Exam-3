import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service'

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  data:any = [];

  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.getUsers().subscribe((res)=>{
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
