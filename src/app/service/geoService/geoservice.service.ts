import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable()
export class GeoService {

    public latitude;
    public longitude;

    constructor(private geolocation: Geolocation){
    }

    getCurrentPostion() {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
         }).catch((error) => {
           console.log('Error getting location', error);
         });
      }

}