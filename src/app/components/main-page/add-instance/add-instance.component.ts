import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormatInstanceClass } from '../class/format-instance-class';


@Component({
  selector: 'app-add-instance',
  templateUrl: './add-instance.component.html',
  styleUrls: ['./add-instance.component.css']
})
export class AddInstanceComponent implements OnInit {
  id: number = 1;
  title: string;
  body: string;
  datePublished: string;
  formAddInstance: FormGroup;

  constructor(private fb: FormBuilder) { }

  @Output() addNewInstance: EventEmitter<FormatInstanceClass> = new EventEmitter();

  ngOnInit(): void {

    let dateObj = new Date();
    const today: string = dateObj.getFullYear() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getUTCDate();
    
    this.formAddInstance = this.fb.group(
      {
        id: [this.id],
        title: [this.title, [Validators.required]],
        description: [this.body, [Validators.required]],
        datePublished: today,
      }
    )
  }
  addInstance(newInstanse: FormatInstanceClass) {
    if(this.formAddInstance.valid) {
      this.addNewInstance.emit(newInstanse);
      console.log(newInstanse);
    }
  }

}
