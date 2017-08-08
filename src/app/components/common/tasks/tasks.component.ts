import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../views/start/user-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { TaskService } from '../../../services/task-service/task.service';
import { Task } from '../../../models/Task'
import { fadeInOut, slideInBottom, slideToRight, slideInTop } from '../../common/transitions/main.animations';


@Component({
  selector: 'tda-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    fadeInOut(),
    slideInBottom(),
    slideToRight(),
    slideInTop()
  ]
})
export class TasksComponent implements OnInit {
	subscription: Subscription;

	openModalCreateTask: boolean = false;
  model: Task = new Task();
  loading: boolean = true;
  error = '';
  success = '';
  tasks = [];
  priorities = ['Alta','Media','Baja'];

  	constructor(
  		private userProfileService: UserProfileService,
      private taskService: TaskService
  	) {
    	// se suscribe al triget que abre y cierra el modal para crear una nueva tarea
      this.subscription = this.userProfileService.getModalTask()
      .subscribe(openModalCreateTask => { 
        this.openModalCreateTask = openModalCreateTask;
      });

      this.loading = true;
      this.taskService.index()
      .subscribe(
        success => {
          this.loading = false
          this.tasks = success;
        },
        error =>  {
          this.loading = false
        }
      );
    }

  ngOnInit() {
  }

  openModalTask() {
     this.userProfileService.setModalTask(true)
  }

  /* ---------------------- EDITAR UNA TAREA --------------------------------------*/
  startEdit(task){
      var original = Object.assign({}, task);
      task.original = original;
      task.editing = true;
  }

  /* ---------------------- CANCELAR LA EDICIÓN DE UNA TAREA --------------------------------------*/
  cancelEdit(task){
      task.name = task.original.name
      task.priority = task.original.priority
      task.due_date = task.original.due_date
      task.editing = false;
      delete this.error
      this.success = ''
  }

  /* ---------------------- MOSTRAR Y OCULTAR ALERTAS DE EXITO Y ERROR --------------------------------------*/
  showError(error) {
    this.error = error
    this.success = ''
  }

  showSuccess(success) {
    this.success = success
    delete this.error
    setTimeout(() => {
       this.closeSuccess()
    }, 5000);
  }

  closeError() {
    this.error = null;
  }

  closeSuccess() {
    this.success = '';
  }

  /* ---------------------- ACTUALIZAR UN DETALLE DEL CONTACTO --------------------------------------*/
  confirmDelete(task){
    task.delete = true
  }

  cancelDelete(task){
    delete task.delete
  }

  delete(task){
    task.loading = true
    this.taskService.deleteTask(task)
      .subscribe(
        success => {
          var index = this.tasks.indexOf(task, 0);
          if (index > -1) {
             this.tasks.splice(index, 1);
          }
          task.loading = false
          this.showSuccess(success.success)
        },
        error =>  {
          task.loading = false
          this.showError(error.errors)
            
        }
      );
  }

  /* ---------------------- ACTUALIZAR UNA TAREA --------------------------------------*/
  update(task){
    task.loading = true
    //let model: Task = new Task(task);
    var model = Object.assign({}, task);
    this.taskService.updateTask(model)
      .subscribe(
        success => {
          task.loading = false
          this.showSuccess(success.success)
          task.name = model.name
          task.priority =  model.priority
          task.due_date =  model.due_date
          task.editing = false;
        },
        error =>  {
          task.loading = false
          this.showError(error)
            
        }
      );
  }

}
