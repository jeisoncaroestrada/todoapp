import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/task-service/task.service';

@Component({
  selector: 'tda-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

	model: Task = new Task();
	loading: boolean = false
    error = '';
	success = '';
	priorities = ['Alta','Media','Baja'];
	constructor(
		private taskService: TaskService
	) {

	}

	ngOnInit() {
	}

	closeError() {
		this.error = '';
	}

	
	closeSuccess() {
		this.success = '';
	}

	createTask(){
		this.loading = true;
		this.taskService.create(this.model)
		.subscribe(
            success => {
            	this.loading = false
            	this.model = new Task();
            	this.success = <any>success.success
            	this.error = ''
            },
            error =>  {
            	this.loading = false
               	this.error = error
               	this.success = ''
			}
       	);
	}

}
