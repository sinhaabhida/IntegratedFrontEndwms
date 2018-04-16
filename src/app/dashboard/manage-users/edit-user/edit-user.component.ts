import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { User } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user:User;
userId:number;
namePattern="[a-zA-Z]*";
emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private activedRoute:ActivatedRoute,private userService:UserService,private toastr:ToastrService, private router:Router) { }

  ngOnInit() {
    this.resetForm();
     this.userId=this.activedRoute.snapshot.params['id'];
    
    this.userService.getUserById(this.userId).subscribe((data:any)=>{
        this.user=data;
         

    },
  (err:HttpErrorResponse)=>{
    
if(err.status==401){
  alert("Session Expired");
  localStorage.removeItem('userToken');
  this.router.navigate(["/login"]);
  
}else if(err.status==400){
  this.toastr.error("No such user found");
}
else{
  alert("Connection Error");
}

  });
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
  update(){
this.userService.updateUser(this.userId,this.user).subscribe((data)=>{
  console.log(data);
  
},
(err:HttpErrorResponse)=>{
console.log(err);

});
  }

}
