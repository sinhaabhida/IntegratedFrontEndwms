import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 user:User;
  isEnabled=false;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getProfile().subscribe((data:any)=>{
      this.user=data;
      console.log(this.user);
      
    },
    (err:HttpErrorResponse)=>{
console.log(err);

    }
  );
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.reset();
    this.user={
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      role:''
    }
  }

}
