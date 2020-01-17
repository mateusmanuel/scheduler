import { Service } from './service';

export class Professional {
    id: number;
    name: string;
    email: string;
    phone: string;
    rating: number;
    enable: boolean;
    services: Service[];
}
