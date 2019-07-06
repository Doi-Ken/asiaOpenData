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

  constructor( public httpService: HttpService,
    public geoService: GeoService) {}

  ngOnInit() {
    // this.get();
    //console.log(this.title);
    this.geoService.getCurrentPostion();
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
    'waypoint0': 'geo!52.5184443440238,13.383906494396967',
    'waypoint1': 'geo!52.51435421904425,13.396947378094524',
    'representation': 'display',
    'avoidareas': '52.51623131288022,13.389888672738778;52.51335487996589,13.395274548440511!52.52006148651319,13.385160024545286;52.517760038213815,13.389707563495335'
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
    //this.get();
    //console.log(this.title);
    this.view();
  }

}
