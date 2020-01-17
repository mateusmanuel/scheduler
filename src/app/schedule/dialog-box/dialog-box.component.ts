import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Schedule } from '../model/schedule';
import { Client } from '../model/client';
import { Professional } from '../model/professional';
import { Service } from '../model/service';
import { Stub } from '../util/stub';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  localData: any;
  schedule: FormGroup;

  clients: Client[];
  services: Service[];
  professionals: Professional[];

  filteredClientes: Observable<Client[]>;
  selectedService: Service;

  phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Schedule,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private stub: Stub) {

    this.action = this.data.action; // Plus property to define action

    this.schedule = this.formBuilder.group({
      id: new FormControl(this.data.id),
      startHour: new FormControl(this.data.startHour, [Validators.required]),
      client: new FormControl(this.data.client, [Validators.required]),
      services: new FormControl(this.data.services, [Validators.required]),
    });
  }

  ngOnInit() {
    this.clients = this.stub.getClients();
    this.filteredClientes = this.schedule.valueChanges
                            .pipe(
                              startWith(''),
                              map(value => typeof value === 'string' ? value : value.nome),
                              map(name => name ? this._filter(name) : this.clients.slice())
                            );

    this.professionals = this.stub.getProfessionals();

    this.services = this.stub.getServices();
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.schedule.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  get name() {
    return this.schedule.get('name') as FormControl;
  }

  get email() {
    return this.schedule.get('email') as FormControl;
  }

  get phone() {
    return this.schedule.get('phone') as FormControl;
  }

  get cpf() {
    return this.schedule.get('cpf') as FormControl;
  }

  getMsgRequired() {
    return 'Campo obrigatório';
  }

  getMsgCPFInvalid() {
    return 'CPF Inválido';
  }

  getMsgEmailInvalid() {
    return 'E-mail Inválido';
  }

  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.name === item2.name : item1 === item2;
  }

  // Métodos para o autocomplete
  private _filter(value: string): Client[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(client?: Client): string | undefined {
    return client ? client.name : undefined;
  }
}
