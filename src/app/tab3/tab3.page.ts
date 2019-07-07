import { Component,  OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { HttpService } from '../service/httpservice.service';
import { GeoService } from '../service/geoService/geoservice.service';
import { AuthService } from '../service/auth/auth.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


declare var H: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public title = 'doiken';
  public title2;
  private get_url = 'https://httpbin.org/get?show_env=1';
  private post_url = 'http://httpbin.org/post';

  public buttonFlag = true;

  public map;

  public selectedLatitude;
  public selectedLongitude;

  @ViewChild("map")
  public mapElement: ElementRef;

  constructor( 
    private navCtrl: NavController,
    public httpService: HttpService,
    public geoService: GeoService,
    public authService: AuthService,
    public alertController: AlertController) {}

  ngOnInit() {
    // this.get();
    //console.log(this.title);
    this.geoService.getCurrentPostion();
    
    // console.log(!this.authService.userDetails());
    // if(!this.authService.userDetails()){
    //   console.log("doikne")
    //   this.navCtrl.navigateForward('tabs/login');
    // }

    this.geoService.geolocation.watchPosition().subscribe((data) => {
      this.geoService.latitude = data.coords.latitude;
      this.geoService.longitude = data.coords.longitude;
     });
  }

  loginClick(){
    this.navCtrl.navigateForward('tabs/login');
  }
  

  public view() {
    
    this.createMap();
    
    console.log(this.mapElement.nativeElement);
    
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.buttonFlag = false;
  
    this.addMarkersToMap(this.map, this.geoService.latitude, this.geoService.longitude);

    this.setUpClickListener(this.map);
  }

  createMap(){
    let platform = new H.service.Platform({
      "app_id": "AfyVgpuzF8PR8NADOtXZ",
      "app_code": "pA1x_lKGluG9gyAfmFAMpQ"
    });

    let defaultLayers = platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
          zoom: 10,
          center: { lat: this.geoService.latitude, lng: this.geoService.longitude }
      }
  );
  }

  async get() {
    return await this.httpService.get(this.get_url).then(res => {this.title = res['args']; });
  }

  async post() {
    return await this.httpService.post(this.post_url, JSON.stringify({'doiken': {'doiken': { 'doiken': 'god' } } })).then(res => {this.title2 = res['data']; });
  }
  

  onClick(){
    //this.get();
    //console.log(this.title);
    this.view();
  }
  
  testClick(){
    this.presentAlertPrompt();
  }


  setUpClickListener(map) {
    // Attach an event listener to map display
    // obtain the coordinates and display in an alert box.

    map.addEventListener('tap', function (evt) {
      var coord = map.screenToGeo(evt.currentPointer.viewportX,
              evt.currentPointer.viewportY);
              this.selectedLatitude = coord.lat;
              this.selectedLongitude = coord.lng;
              console.log(this.selectedLatitude);
              console.log(this.selectedLongitude);

      alert('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
          ((coord.lat > 0) ? 'N' : 'S') +
          ' ' + Math.abs(coord.lng.toFixed(4)) +
           ((coord.lng > 0) ? 'E' : 'W'));
    });

  }

  ngDoCheck(){
    console.log("lat: " + this.geoService.latitude);
    console.log("long:" + this.geoService.longitude);
  }


  
  addMarkersToMap(map, latitude, longitude) {
    var placeMarker = new H.map.Marker({lat: latitude, lng: longitude});
    map.addObject(placeMarker);
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            console.log(this.selectedLatitude);
            console.log(this.selectedLongitude);
            //this.addMarkersToMap(this.map, parseFloat(this.selectedLatitude), parseFloat(this.selectedLongitude));
          }
        }
      ]
    });

    await alert.present();
  }

}
