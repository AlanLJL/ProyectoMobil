import { Component } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'angular-http-client';
  constructor(
    private taskService:TaskService ) {
      name: String;
      email:String;
      phoneNumber:Number;
    }


  getAllTask(){
    this.taskService.getAllTask()
    .subscribe(tasks=> {
      console.log(tasks);
    })
  }

  getTask(){
    this.taskService.getTask('1')
    .subscribe(task=>{
      console.log(task)
    });
  }

  createTask() {
    const task ={
      id:'12',
      userId :'1',
      title:'charge title',
      completed:true
    };
    this.taskService.createTask(task)
    .subscribe((newTask)=> {
      console.log(newTask);
    });
  }

  updateTask() {
    const task ={
      id:'201',
      userId :'1',
      title:'otro titulo',
      completed:true
    };
    this.taskService.updateTask(task)
    .subscribe((newTask)=> {
      console.log(newTask);
    });
  }

  deleteTask(){
    this.taskService.deleteTask('1')
    .subscribe((data)=>{
      console.log(data)
    });
  }


}
