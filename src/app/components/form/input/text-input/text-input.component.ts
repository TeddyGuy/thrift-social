import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import FormControlBase from 'src/app/models/form/FormControlBase';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {

  @Input() formInputMetaData!: FormControlBase;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {}

}
