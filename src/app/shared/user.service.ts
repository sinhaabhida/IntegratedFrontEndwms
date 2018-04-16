import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import { User } from './user.model';
import { throws } from 'assert';
import { log } from 'util';

@Injectable()
export class UserService {
  readonly rootUrl="http://localhost:8080/";

  constructor(private http:HttpClient) { }

  createUser(user:User){
  console.log(user);
  
    const body:User={
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password,
      role:user.role
    }
    console.log(body);
    
   return this.http.post(this.rootUrl+"user/create_users?access_token="+localStorage.getItem('userToken'),body);

  }
  userAuthentication(userName,password){
    var data="grant_type=password&username="+userName+"&password="+password;
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','Authorization':'Basic '+btoa("my-client"+':'+"secret"),'No-Auth':'True'});
    
    return this.http.post(this.rootUrl+"oauth/token",data,{headers:reqHeader});
  }

getUserList(){
  return this.http.get(this.rootUrl+"user/manage_users?access_token="+localStorage.getItem('userToken'));
}

deleteUser(id:number){
  return this.http.post(this.rootUrl+"user/delete_user?access_token="+localStorage.getItem('userToken'),id);
}
getUserById(Id:number){
  var reqHeader=new HttpHeaders({'Content-Type':'application/json'});
  return this.http.post(this.rootUrl+"user/getuser?access_token="+localStorage.getItem('userToken'),Id,{headers:reqHeader});
}
updateUser(id:number,user:User){

  // console.log(user);
  var reqHeader=new HttpHeaders({'Content-Type':'application/json'});
 var body={
   id:id,
   firstName:user.firstName,
   lastName:user.lastName,
   email:user.email,
   role:user.role
 }
 console.log(body);
 
 
return this.http.post(this.rootUrl+"user/update_user?access_token="+localStorage.getItem('userToken'),body,{headers:reqHeader});

}
getProfile(){
  return this.http.get(this.rootUrl+"user/profile?access_token="+localStorage.getItem('userToken'));
}

}
