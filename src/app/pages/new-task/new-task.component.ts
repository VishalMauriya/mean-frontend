import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit{
  listId : String = "";

  constructor(
    private taskService : TaskService,
    private router : Router,
    private route : ActivatedRoute
    ){
      this.route.params.subscribe((params : Params) => this.listId = params['listId']);
  }

  ngOnInit(){

  }

  addTask(value : String){
    this.taskService.createTask(this.listId , value)
    .subscribe(() => this.router.navigate(['../'], {relativeTo : this.route}));
  }
}
