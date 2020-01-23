import { Client } from '../model/client';
import { Service } from '../model/service';
import { Professional } from '../model/professional';
import { Injectable } from '@angular/core';

@Injectable()
export class Stub {
    getClients(): Client[] {
        return [{id: 1, name: 'Éber Moreira', cpf: '052.871.771-51', email: 'eber@unb.br', phone: '(61) 3107-0023'},
                {id: 2, name: 'Mateus Manuel', cpf: '052.871.771-51', email: 'mateusmanuel@unb.br', phone: '(61) 3107-0023'}];
    }

    getServices(): Service[] {
        return [{id: 1, nome: 'Serviço1', duracao: 0, valor: 0, idSalao: 0, status: 0},
                {id: 2, nome: 'Serviço2', duracao: 0, valor: 0, idSalao: 0, status: 0},
                {id: 3, nome: 'Serviço3', duracao: 0, valor: 0, idSalao: 0, status: 0},
                {id: 4, nome: 'Serviço4', duracao: 0, valor: 0, idSalao: 0, status: 0},
                {id: 5, nome: 'Serviço5', duracao: 0, valor: 0, idSalao: 0, status: 0}];
    }

    getProfessionals(): Professional[] {
        // tslint:disable-next-line:max-line-length
        return [{id: 1, name: 'Éber Moreira', email: 'eber@unb.br', phone: '3107-0023', rating: 5.0, enable: true, services: []},
                {id: 2, name: 'Mateus Manuel', email: 'mateusmanuel@unb.br', phone: '3107-0023', rating: 4.5, enable: true, services: []}];
    }
}
