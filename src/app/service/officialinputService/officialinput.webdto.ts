import { Injectable } from '@angular/core';
import { OfficialinputData } from '../../dto/officialinput.data';

@Injectable()
export class OfficialinputWebDTO {
    id: number;
    officialinputData: OfficialinputData [];
    constructor() {
        this.officialinputData = [];
        this.id = 0;
    }
}