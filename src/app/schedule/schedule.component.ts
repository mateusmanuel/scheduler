import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Client } from './model/client';
import { Schedule } from './model/schedule';

const ELEMENT_DATA: Schedule[] = [];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = ['id', 'client', 'startHour', 'services', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {

  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        console.log(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Atualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Excluir') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj) {
    // Call to service
    console.log(rowObj);
    this.dataSource.push({
      id: rowObj.id === null ? 1 : this.dataSource[this.dataSource.length - 1].id + 1,
      startHour: rowObj.startHour,
      client: rowObj.client,
      services: rowObj.services
    });
    this.table.renderRows();

  }

  updateRowData(rowObj) {
    // Call to service
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.startHour = rowObj.startHour;
        value.client = rowObj.client;
        value.services = rowObj.services;
      }
      return true;
    });
  }

  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowObj.id;
    });
  }

}
