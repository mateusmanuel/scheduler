import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
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
  professionalsFilter: Professional[];

  filteredClients: Observable<Client[]>;
  selectedService: Service;
  selectedProfessional: Professional;

  displayedColumns: string[] = ['service', 'professional', 'actions'];
  dataSource = new MatTableDataSource([]);

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
      services: new FormArray([
        new FormGroup({
          service: new FormControl([Validators.required]),
          professional: new FormControl([Validators.required])
        })
      ]),
    });
  }

  ngOnInit() {
    this.clients = this.stub.getClients();
    this.filteredClients = this.schedule.controls.client.valueChanges
                            .pipe(
                              startWith(''),
                              map(value => typeof value === 'string' ? value : value.name),
                              map(name => name ? this._filter(name) : this.clients.slice())
                            );
    
    // Just when we are not retrying services values
    (<FormArray>this.schedule.controls.services).removeAt(0);
    this.dataSource = (<FormArray>this.schedule.controls.services).value;

    this.professionals = this.stub.getProfessionals();
    
    this.services = this.stub.getServices();

    this.professionals[0].services.push(this.services[0]);
    this.professionals[1].services.push(this.services[1]);
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.schedule.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  get id() {
    return this.schedule.get('id') as FormControl;
  }

  get client() {
    return this.schedule.get('client') as FormControl;
  }

  get startHour() {
    return this.schedule.get('startHour') as FormControl;
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

  serviceChangeAction(service) {
    this.professionalsFilter = this.professionals.filter(professional => professional.services.find(item => item.nome.includes(service.id)));
    this.selectedProfessional = this.professionalsFilter[0];
  }

  addService() {
    (<FormArray>this.schedule.controls.services).push(this.formBuilder.group({service: this.selectedService, professional: this.selectedProfessional}));
    this.dataSource = (<FormArray>this.schedule.controls.services).value;
  
  }

  removeService(index) {
    (<FormArray>this.schedule.controls.services).removeAt(index);
    this.dataSource = (<FormArray>this.schedule.controls.services).value;
  }

  // Métodos para o autocomplete
  private _filter(value: string): Client[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.clients.filter(option => option.name.toLowerCase().indexOf(filterValue) == 0);
  }

  displayFn(client?: Client): string | undefined {
    return client ? client.name : undefined;
  }
}
