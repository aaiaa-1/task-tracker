import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> =new EventEmitter();

  text!: string;
  day!: string;
  reminder: boolean = false;

  showAddTask: boolean = false;
  subcription!: Subscription;


  constructor(private uiService: UiService){
    this.subcription = this.uiService
                                    .onToggle()
                                    .subscribe(
                                      (value)=> (this.showAddTask = value) 
                                    ); 
  }
   
  ngOnInit(): void {  }

  onSubmit(){
    if(!this.text){
      alert("Please enter a text");
      return ;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    //emit the event
    this.onAddTask.emit(newTask);

    //Clear the form after submission
    this.text = '';
    this.day = '';
    this.reminder = false;

  }



}
