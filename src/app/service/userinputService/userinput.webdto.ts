import { Injectable } from '@angular/core';
import { UserinputData } from '../../dto/userinput.data';

@Injectable()
export class UserinputWebDTO {
    id: number;
    userinputData: UserinputData [];
    constructor() {
        this.userinputData = [];
        this.id = 0;
    }
}