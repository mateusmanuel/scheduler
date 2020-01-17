import { Client } from './client';
import { Service } from './service';
import { Professional } from './professional';

export class Schedule {
    id: number;
    startHour: string;
    client: Client;
    services: {service: Service, professional: Professional}[];
    action?: string; // To dialog action
}
