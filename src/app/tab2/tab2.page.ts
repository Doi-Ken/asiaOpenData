import { Component,  OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { HttpService } from '../service/httpservice.service';
import { GeoService } from '../service/geoService/geoservice.service';



declare var H: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public title = 'doiken';
  public title2;
  private get_url = 'https://httpbin.org/get?show_env=1';
  private post_url = 'http://httpbin.org/post';

  public buttonFlag = true;

  @ViewChild("map")
  public mapElement: ElementRef;

  constructor(
    public httpService: HttpService,
    public geoService: GeoService) {}

  ngOnInit() {
    // this.get();
    //console.log(this.title);
    this.geoService.getCurrentPostion();
    this.geoService.geolocation.watchPosition().subscribe((data) => {
      this.geoService.latitude = data.coords.latitude;
      this.geoService.longitude = data.coords.longitude;
     });
  }

public view() {
  let platform = new H.service.Platform({
      "app_id": "AfyVgpuzF8PR8NADOtXZ",
      "app_code": "pA1x_lKGluG9gyAfmFAMpQ"
  });
  let defaultLayers = platform.createDefaultLayers();
  
  console.log(this.mapElement.nativeElement);
  
  let map = new H.Map(
    this.mapElement.nativeElement,
    defaultLayers.normal.map,
    {
        zoom: 10,
        center: { lat: this.geoService.latitude, lng: this.geoService.longitude  }
    }
  );

  // parameters you have to edit
  // waypoint0: start point
  // waypoint1: end point
  // avoidareas: areas you want to avoid
  var routingParameters = {
    'mode': 'fastest;car;traffic:disabled',
    'waypoint0': 'geo!25.12857100000000,121.50709700000000',
    'waypoint1': 'geo!25.13810500000000,121.49287900000000',
    'representation': 'display',
    'avoidareas': '25.13107800000000,121.50459900000000;25.12880700000000,121.50676200000000'
  };

  
  
  var onResult = function(result) {
    var route,
      routeShape,
      startPoint,
      endPoint,
      linestring;
    if(result.response.route) {
      route = result.response.route[0];
      routeShape = route.shape;
    
      linestring = new H.geo.LineString();
    
      routeShape.forEach(function(point) {
        var parts = point.split(',');
        linestring.pushLatLngAlt(parts[0], parts[1]);
      });
  
      startPoint = route.waypoint[0].mappedPosition;
      endPoint = route.waypoint[1].mappedPosition;
    
      var routeLine = new H.map.Polyline(linestring, {
        // style: { strokeColor: 'blue', lineWidth: 10 }
        style: { lineWidth: 10 },
        arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
      });
    
      var startMarker = new H.map.Marker({
        lat: startPoint.latitude,
        lng: startPoint.longitude
      });
    
      var endMarker = new H.map.Marker({
        lat: endPoint.latitude,
        lng: endPoint.longitude
      });
    
      map.addObjects([routeLine, startMarker, endMarker]);
    
      map.setViewBounds(routeLine.getBounds());

      var icon = new H.map.Icon('../../assets/marks/batsu.svg');
      var coords = {lat: 25.13107800000000, lng: 121.50459900000000};
      var marker = new H.map.Marker(coords, {icon: icon});
      map.addObject(marker);

      var _coords = {lat: 25.13557500000000, lng: 121.50180000000000};
      var _marker = new H.map.Marker(_coords, {icon: icon});
      map.addObject(_marker);
    }
  };

  var router = platform.getRoutingService();

  router.calculateRoute(routingParameters, onResult,
    function(error) {
      alert(error.message);
    });

  let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));  
  this.buttonFlag = false;
}
  async get() {
    return await this.httpService.get(this.get_url).then(res => {this.title = res['args']; });
  }

  async post() {
    return await this.httpService.post(this.post_url, JSON.stringify({'doiken': {'doiken': { 'doiken': 'god' } } })).then(res => {this.title2 = res['data']; });
  }
  

  onClick(){
    this.view();
  }

}
