import { Component, OnInit } from '@angular/core';
import { Task } from '../../../shared/task.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../../../shared/task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
task:Task;
usersList:any;
  constructor(private userService:UserService,private taskService:TaskService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getUserList().subscribe((data:any)=>{
this.usersList=data;

    },
  (err:HttpErrorResponse)=>{
console.log(err);

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
OnSubmit(form:NgForm){
this.taskService.createTaskService(form.value).subscribe((data:any)=>{
  if(data==true){
this.toastr.success("Task has been successfully created");
this.router.navigate(["/dashboard/tasks"]);

  } else{
    this.toastr.error("Could not create task");
  }

},
(err:HttpErrorResponse)=>{
  console.log(err);
  

});

}
}
