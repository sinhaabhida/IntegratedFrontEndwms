import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  usersList:any;

  constructor(private userService:UserService,private router:Router,private toastr:ToastrService) {
  }

  ngOnInit() {
    this.userService.getUserList().subscribe((data:any)=>{
      this.usersList=data;
      
     },
     (err:HttpErrorResponse)=>{
      if(err.status==401){
        
        alert("Session Expired");
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
       

      }else{
        alert("Connection Error");
      }
       
     });

  }
  delete(id:number){
    if(confirm('Are you sure to delete the user ?')==true){
    this.userService.deleteUser(id).subscribe((data:any)=>{
      if(data==true){
        this.ngOnInit();
      }else{
        this.toastr.error("Could not delete");
      }

    },
    (err:HttpErrorResponse)=>{
      if(err.status==401){
        alert("Session Expired");
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
      }else{
        alert("Connection problem");
      }
    }
  );
}
  }

}
