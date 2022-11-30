import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      task: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
