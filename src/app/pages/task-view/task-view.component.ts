import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists : List[] = [];
  tasks : Task[] = [];
  listId : any;
  listClicked: String | null = null;

  constructor(
    private taskService : TaskService,
    private route : ActivatedRoute,
    private router : Router
    ){}
  
  ngOnInit() {
    this.taskService.getLists()
    .subscribe((lists: List[] | Object) => {
      this.lists = lists as List[];
    });

    this.route.params.subscribe((params : Params) => {
      this.listId = params['listId'];
      if(!this.listId) return;
      this.taskService.getTasks(this.listId)
        .subscribe((tasks: Task[] | Object) => {
          this.tasks = tasks as Task[];
        });
    });
  }

  onTaskClick(task :Task){
    return this.taskService.setCompleted(this.listId, task)
            .subscribe(() => task.completed = !task.completed);
  }

  deleteTask(task : Task){
    return this.taskService.deleteTask(this.listId, (task as Task)._id)
              .subscribe((task: Task | Object) => {
                this.tasks = this.tasks.filter(t => t._id != (task as Task)._id);
              });
  }

  deleteList(list : List){
    console.log(list._id);
    return this.taskService.deleteList(list._id)
              .subscribe(() => this.lists = this.lists.filter(l => l._id != list._id));
  }

  addTaskClick(){
    if(!this.listId){
      alert("Please select the list to add any task!");
      return;
    }

    this.router.navigate(['./new-task'], {relativeTo : this.route});
  }

  onListItemClick(listId: String) {
    this.listClicked = listId;
  }

}
