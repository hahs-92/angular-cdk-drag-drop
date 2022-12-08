import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Itask } from '../models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  myForm: FormGroup;
  tasks: Itask[] = [{ description: 'Learn React', done: false }];
  inprogress: Itask[] = [];
  done: Itask[] = [];
  updateIndex!: any;
  isEditEnable: boolean = false;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      task: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.isEditEnable) {
      this.updateTask();
      this.myForm.reset();
      return;
    }

    this.onAddTask();
    this.myForm.reset();
  }

  onAddTask() {
    this.tasks.push({
      description: this.myForm.value.task,
      done: false,
    });
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  deleteTaskInProgress(index: number) {
    this.inprogress.splice(index, 1);
  }

  deleteTaskDone(index: number) {
    this.done.splice(index, 1);
  }

  editTask(task: Itask, index: number) {
    this.myForm.controls['task'].setValue(task.description);
    this.updateIndex = index;
    this.isEditEnable = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.myForm.value.task;
    this.tasks[this.updateIndex].done = false;
    this.myForm.reset();
    this.updateIndex = undefined;
    this.isEditEnable = false;
  }

  drop(event: CdkDragDrop<Itask[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
