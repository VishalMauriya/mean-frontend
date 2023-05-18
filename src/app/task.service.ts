import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Task from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService : WebService) { }

  getLists(){
    return this.webService.get('lists');
  }

  createList(title : String){
    return this.webService.post('lists', {title});
  }

  deleteList(listId : String){
    return this.webService.delete(`lists/${listId}`);
  }

  getTasks(listId : String){
    return this.webService.get(`lists/${listId}/tasks`);
  }

  createTask(listId : String, title : String){
    return this.webService.post(`lists/${listId}/tasks`, {title});
  }

  deleteTask(listId : String, taskId : String){
    return this.webService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  setCompleted(listId : String, task : Task){
    return this.webService.patch(`lists/${listId}/tasks/${task._id}`, {completed : !task.completed});
   }
}
