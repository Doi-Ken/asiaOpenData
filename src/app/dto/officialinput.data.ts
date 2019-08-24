import { Injectable } from '@angular/core';

@Injectable()
export class OfficialinputData {
  id: number;
  value: string;
  latitude: number;
  longitude: number;
  
  constructor(
    id: number,
    value: string,
    latitude: number,
    longitude: number
  ) {
    this.id = id;
    this.value = value;
    this.latitude = latitude;
    this.longitude = longitude;
}
}