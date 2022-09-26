import { Component, DoCheck, OnInit } from '@angular/core';

// model
import { TaskList } from '../../models/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  public list: Array<TaskList> = [];

  constructor() {
    this.list = JSON.parse(localStorage.getItem("list") || "[]");
  }

  ngOnInit(): void { }

  ngDoCheck(): void {
    if (this.list) {
      this.updateOrder();
      this.updateLocalStorage();
    }
  }

  public getNewTask(newTask: string): void {
    this.list.push({ task: newTask, checked: false });
  }

  public checkedList(taskIndex: number): void {
    if (this.list[taskIndex].checked) {
      this.list[taskIndex].checked = false;
    }
    else {
      this.list[taskIndex].checked = true;
    }
  }

  public validateTask(task: string, taskIndex: number): void {
    if (!task.length) {
      this.deleteTask(taskIndex);
    }
  }

  public deleteTask(taskIndex: number): void {
    this.list.splice(taskIndex, 1);
  }

  public deleteAll(): void {
    const confirm = window.confirm("Deletar todas as tasks?");
    if (confirm) {
      this.list = [];
    }
  }

  public updateOrder(): void {
    this.list.sort((first, last) => Number(first.checked) - Number(last.checked));
  }

  public updateLocalStorage(): void {
    localStorage.setItem("list", JSON.stringify(this.list));
  }

}
