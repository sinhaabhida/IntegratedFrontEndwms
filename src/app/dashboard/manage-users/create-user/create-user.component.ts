import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user:User;
namePattern="[a-zA-Z]*";
emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private userService:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.resetForm();
    
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
  OnSubmit(form:NgForm){
  
    this.userService.createUser(form.value).subscribe((data:any)=>
  {
    
if(data==true){
  this.resetForm(form);
this.toastr.success("Successfully Registered");
this.router.navigate(['/dashboard/users']);

}else if(data==false){
  this.toastr.error("Registration Unsuccessfull");

}},
(err:HttpErrorResponse)=>{
  if(err.status==401){
    alert("Session Expired");
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
   
  }else{
    alert('Connection Problem');
  }
  
  }
);
  }

}
