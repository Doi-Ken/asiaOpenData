import { Component,  OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { HttpService } from '../service/httpservice.service';
import { GeoService } from '../service/geoService/geoservice.service';
import { AuthService } from '../service/auth/auth.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserinputWebDTO } from '../service/userinputService/userinput.webdto';
import { OfficialinputWebDTO } from '../service/officialinputService/officialinput.webdto';
import { UserinputData} from '../dto/userinput.data';
import { OfficialinputData } from '../dto/officialinput.data';



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
    public alertController: AlertController,
    public userinputWebDto: UserinputWebDTO,
    public officialinputWebDto: OfficialinputWebDTO) {}

  ngOnInit() {
    // this.get();

    // get currentpostion()
    // this.geoService.getCurrentPostion();
    
    // this.geoService.geolocation.watchPosition().subscribe((data) => {
    //   this.geoService.latitude = data.coords.latitude;
    //   this.geoService.longitude = data.coords.longitude;
    //  });

    this.geoService.latitude = 25.128570000;
    this.geoService.longitude = 121.5070970000000;



    // let userinputData = new UserinputData(
    //   this.userinputWebDto.id,
    //   data,
    //   parseFloat(this.selectedLatitude),
    //   parseFloat(this.selectedLongitude)
    // );
    // this.userinputWebDto.id++;
    // this.userinputWebDto.userinputData.push(userinputData);
  }

  loginClick(){
    this.navCtrl.navigateForward('tabs/login');
  }
  

  public view() {
    
    this.createMap();
    
    console.log(this.mapElement.nativeElement);
    
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.buttonFlag = false;
  
    //test code (start)
    this.geoService.latitude = 25.128570000;
    this.geoService.longitude = 121.5070970000000;
    // test code (end)
    this.addMarkersToMap(this.map, this.geoService.latitude, this.geoService.longitude);

    // test code (start)
    // test goal point
    let goal_icon = new H.map.Icon('../../assets/marks/blackpoint.svg');
    this.addMarkersToMapWithIcon(this.map, 25.13810500000000, 121.49287900000000, goal_icon);

    // test user select point
    let select_icon = new H.map.Icon('../../assets/marks/redpoint.svg');
    this.addMarkersToMapWithIcon(this.map, 25.12880700000000, 121.5067620000000, select_icon);
    


    // random for test data
    const latitudeMin = 25.03559659247661;
    const latitudeMax = 25.175496265888558 ;
    const longitudeMin = 121.41864775073213;
    const longitudeMax = 121.6563580168454 ;
    let latitude = 0.0;
    let longitude = 0.0;
    for (let i = 0; i < 10; i++) {
      latitude = Math.random() * (latitudeMax - latitudeMin ) + latitudeMin;
      longitude = Math.random() * (longitudeMax - longitudeMin ) + longitudeMin;
      this.officialinputWebDto.officialinputData.push(
        new OfficialinputData(
          i,
          '',
          latitude,
          longitude
        )
      );
      this.officialinputWebDto.id++;
      let icon = new H.map.Icon('../../assets/marks/batsu.svg');
      this.addMarkersToMapWithIcon(this.map, latitude, longitude, icon);
    }

    
    // const from Official worker
    this.officialinputWebDto.officialinputData.push(
      new OfficialinputData(
        10,
        '',
        25.13107800000000,
        121.50459900000000
      )
    );
    this.officialinputWebDto.id++;
    let icon = new H.map.Icon('../../assets/marks/batsu.svg');
    this.addMarkersToMapWithIcon(this.map, 25.13107800000000, 121.50459900000000, icon);


    // user data dangerous
    for (let i = 0; i < 3; i++) {
      latitude = Math.random() * (latitudeMax - latitudeMin ) + latitudeMin;
      longitude = Math.random() * (longitudeMax - longitudeMin ) + longitudeMin;
      this.userinputWebDto.userinputData.push(
        new UserinputData(
          i,
          'DangerousArea',
          latitude,
          longitude
        )
      );
      this.officialinputWebDto.id++;
      let icon = new H.map.Icon('../../assets/marks/warning.svg');
      this.addMarkersToMapWithIcon(this.map, latitude, longitude, icon);
    }


    // user data help
    for (let i = 0; i < 10; i++) {
      latitude = Math.random() * (latitudeMax - latitudeMin ) + latitudeMin;
      longitude = Math.random() * (longitudeMax - longitudeMin ) + longitudeMin;
      this.userinputWebDto.userinputData.push(
        new UserinputData(
          i,
          'CallforHelp',
          latitude,
          longitude
        )
      );
      this.officialinputWebDto.id++;
      let icon = new H.map.Icon('../../assets/marks/help.svg');
      this.addMarkersToMapWithIcon(this.map, latitude, longitude, icon);
    }



    // user data supplies
    for (let i = 0; i < 10; i++) {
      latitude = Math.random() * (latitudeMax - latitudeMin ) + latitudeMin;
      longitude = Math.random() * (longitudeMax - longitudeMin ) + longitudeMin;
      this.userinputWebDto.userinputData.push(
        new UserinputData(
          i,
          'SupportSupplies',
          latitude,
          longitude
        )
      );
      this.officialinputWebDto.id++;
      let icon = new H.map.Icon('../../assets/marks/supplies.svg');
      this.addMarkersToMapWithIcon(this.map, latitude, longitude, icon);
    }



    // test code (end)

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

    map.addEventListener('tap', (evt) => {
      let coord = map.screenToGeo(evt.currentPointer.viewportX,
              evt.currentPointer.viewportY);
              
              this.selectedLatitude = coord.lat;
              this.selectedLongitude = coord.lng;
              console.log("aaa" + this.selectedLatitude);
              console.log("aaa" + this.selectedLongitude);

      // alert('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
      //     ((coord.lat > 0) ? 'N' : 'S') +
      //     ' ' + Math.abs(coord.lng.toFixed(4)) +
      //      ((coord.lng > 0) ? 'E' : 'W'));
      this.presentAlertPrompt();
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

  addMarkersToMapWithIcon(map, latitude, longitude, icontype) {
    var placeMarker = new H.map.Marker({lat: latitude, lng: longitude}, { icon: icontype });
    map.addObject(placeMarker);
  }


  async presentAlertPrompt() {
    let radioOptions = [];
    
    radioOptions.push({type: 'radio', label: '1. 危険場所の公開', value: 'DangerousArea', checked: true});
    radioOptions.push({type: 'radio', label: '2. 支援物資の要求', value: 'SupportSupplies', checked: false});
    radioOptions.push({type: 'radio', label: '3. 救助要請の要求', value: 'CallforHelp', checked: false});
    
    const alert = await this.alertController.create({
      header: 'Prompt!',
      // inputs: [
      //   {
      //     name: 'name',
      //     type: 'text',
      //     placeholder: 'Your Name'
      //   },
      //   {
      //     name: 'comment',
      //     type: 'text',
      //     placeholder: 'yourcomment'
      //   }
      // ],
      inputs: radioOptions,
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
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(this.selectedLatitude);
            console.log(this.selectedLongitude);
            let userinputData = new UserinputData(
              this.userinputWebDto.id,
              data,
              parseFloat(this.selectedLatitude),
              parseFloat(this.selectedLongitude)
            );
            this.userinputWebDto.id++;
            this.userinputWebDto.userinputData.push(userinputData);
            console.log(data);
            let icon;
            if (data === 'SupportSupplies') {
              icon = new H.map.Icon('../../assets/marks/supplies.svg');
            } else if (data === 'CallforHelp') {
              icon = new H.map.Icon('../../assets/marks/help.svg');
            } else {
              icon = new H.map.Icon('../../assets/marks/warning.svg');
            }
            this.addMarkersToMapWithIcon(this.map, parseFloat(this.selectedLatitude), parseFloat(this.selectedLongitude), icon);
          }
        }
      ]
    });

    await alert.present();
  }

}
