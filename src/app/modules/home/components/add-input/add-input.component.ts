import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskList } from '../../models/task-list';

@Component({
  selector: 'app-add-input',
  templateUrl: './add-input.component.html',
  styleUrls: ['./add-input.component.scss']
})
export class AddInputComponent implements OnInit {

  @Output() public emitNewTask = new EventEmitter();
  public newTask: string = "";

  constructor() { }
  ngOnInit(): void { }

  public setNewTask(): void {
    this.newTask = this.newTask.trim();
    if (this.newTask) {
      this.emitNewTask.emit(this.newTask);
      this.newTask = "";
    }
  }

}
