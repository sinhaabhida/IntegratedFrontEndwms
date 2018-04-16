import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../shared/task.service';
import { Task } from '../../../shared/task.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
taskId:string;
task:Task;
  constructor(private activetedRoute:ActivatedRoute,private taskService:TaskService,private toastr:ToastrService,private router:Router,private _location:Location) { }

  ngOnInit() {
this.resetForm();
    this.taskId=this.activetedRoute.snapshot.params['id'];
    this.taskService.getEditDetails(this.taskId).subscribe((data:any)=>{
    this.task=data;
    });
    
  }
resetForm(form?:NgForm){
if(form!=null)
form.reset();
this.task={
  id:'',
  taskName:'',
  priority:'',
  assignee:'',
  description:'',
  taskCreator:'',
  status:''
}
  }
  update(status:String,id:String){
   this.taskService.updateStatus(status,id).subscribe((data:any)=>{
     this.toastr.success(data.message);
     this._location.back();
   },
  (err:HttpErrorResponse)=>{
    console.log(err);
  }
  );
  }

  back(){
    this._location.back();
  }

}
