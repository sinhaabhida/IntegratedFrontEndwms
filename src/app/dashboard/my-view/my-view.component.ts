import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task.model';
import { TaskService } from '../../shared/task.service';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-my-view',
  templateUrl: './my-view.component.html',
  styleUrls: ['./my-view.component.css']
})
export class MyViewComponent implements OnInit {
  user: User;
  task: Task[];
  constructor(private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {

    this.userService.getProfile().subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
      console.log(this.user.role);
      this.taskService.getTastList().subscribe((data: any) => {
        this.task = data;
        this.filterTaskData();
      });
      // this.accessUser();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

  }

filterTaskData(){
  this.task=this.task.filter((listItem) => { return listItem.assignee ==(this.user.firstName+' '+this.user.lastName)})
}

}
