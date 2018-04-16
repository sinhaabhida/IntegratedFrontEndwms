import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task.model';
import { TaskService } from '../../shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
task:Task;
  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.taskService.getTastList().subscribe((data:any)=>{
      this.task=data;
      
    });

  }

}
