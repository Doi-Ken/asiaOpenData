import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { nextContext } from '@angular/core/src/render3';


@Injectable()
export class GeoService {

    public latitude;
    public longitude;

    constructor(public geolocation: Geolocation){
    }

    getCurrentPostion() {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
         }).catch((error) => {
           console.log('Error getting location', error);
         });

      }

    watchCurrentPostion() {
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
         this.latitude = data.coords.latitude;
         this.longitude = data.coords.longitude;
        });
    }

}