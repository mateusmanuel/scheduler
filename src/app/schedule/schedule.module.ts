import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSelectModule,
  MatAutocompleteModule
} from '@angular/material';

import { TextMaskModule } from 'angular2-text-mask';

import { ScheduleComponent } from './schedule.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Stub } from './util/stub';

@NgModule({
  declarations: [
    ScheduleComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    TextMaskModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [
    Stub
  ]
})
export class ScheduleModule { }
