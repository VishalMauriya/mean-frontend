import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import List from 'src/app/models/list';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit{
  constructor(
    private taskService : TaskService,
    private router : Router
    ){

  }

  ngOnInit(){

  }

  addList(value : String){
    this.taskService.createList(value)
    .subscribe((list : List | Object) => this.router.navigate(['/lists', (list as List)._id]));
  }
}
