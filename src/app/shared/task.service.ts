import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';

@Injectable()
export class TaskService {
readonly rootUrl="http://localhost:8080/";
  constructor(private http:HttpClient) { }

createTaskService(task:Task){
return this.http.post(this.rootUrl+"tasks/create_task?access_token="+localStorage.getItem('userToken'),task);  
}
getTastList(){
  return this.http.get(this.rootUrl+"tasks/list_task?access_token="+localStorage.getItem('userToken'))
}
getEditDetails(taskId:string){
  return this.http.post(this.rootUrl+"tasks/edit_task?access_token="+localStorage.getItem('userToken'),taskId);
}
updateStatus(status:String,id:String){
  console.log('Id'+id+'Status'+status)
  return this.http.post(this.rootUrl+"tasks/update_status?access_token="+localStorage.getItem('userToken'),{id:id,status:status});
}
}
