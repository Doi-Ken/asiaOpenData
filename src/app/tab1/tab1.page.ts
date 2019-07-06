import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/httpservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public title;
  private get_url = 'https://route.api.here.com/routing/7.2/calculateroute.json?app_id=yiVZ4u4SmBrttmo1yJkV&app_code=xLsB2C5DZitUTb7zcbs9pA&waypoint0=geo!52.513343,13.356054&waypoint1=geo!50.088478,14.432714&mode=fastest;car;traffic:disabled&alternatives=2&routeattributes=labels';
  // https://route.api.here.com/routing/7.2/calculateroute.json?app_id=yiVZ4u4SmBrttmo1yJkV&app_code=xLsB2C5DZitUTb7zcbs9pA&waypoint0=geo!52.513343,13.356054&waypoint1=geo!50.088478,14.432714&mode=fastest;car;traffic:disabled&alternatives=2&routeattributes=labels
  // https://weather.api.here.com/weather/1.0/report.json?app_id=AnI4sryhVIB0pHljSuiK&app_code=Yhsj4Y4hKqfG1M71Y7OR8Q&product=observation&name=Tokyo  
  private post_url = 'http://httpbin.org/post';

  constructor( public httpService: HttpService){

  }

  ngOnInit() {
    this.get();
    console.log(this.title);
  }
  
  async get() {
    return await this.httpService.urlencoded_get(this.get_url).then(res => {this.title = res; });
  }

  onClick(){
    this.get();
    console.log(this.title);
  }

}
