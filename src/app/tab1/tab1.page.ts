import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/httpservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public title = 'doiken';
  public title2;
  private get_url = 'https://httpbin.org/get?show_env=1';
  private post_url = 'http://httpbin.org/post';

  constructor( public httpService: HttpService){

  }

  ngOnInit() {
    this.get();
    console.log(this.title);
  }
  
  async get() {
    return await this.httpService.get(this.get_url).then(res => {this.title = res['args']; });
  }

  async post() {
    return await this.httpService.post(this.post_url, JSON.stringify({'doiken': {'doiken': { 'doiken': 'god' } } })).then(res => {this.title2 = res['data']; });
  }
  

  onClick(){
    this.get();
    console.log(this.title);
    this.post();
    console.log(this.title2);
  }

}
