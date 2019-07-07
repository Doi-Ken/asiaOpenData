import { Injectable } from '@angular/core';
import { MessageWebDTO } from './message.webdto';
import { MessageData } from '../../dto/message.data';
import { HttpService } from "../httpservice.service";
// Todo
// httpclient

@Injectable()
export class MessageManagerService {
  
  private post_url = 'http://httpbin.org/post';
  private put_url = 'http://httpbin.org/put';
  private get_url = 'http://httpbin.org/get';

  constructor(private webdto: MessageWebDTO,
    public httpService: HttpService){
    
  }

  async addData(river_name: string,
    image_url: string,
    latitude: string,
    longitude: string,
    upload_from: string,
    comment: string,
    reliability: number,
    city_checked: string,
    prefecture_checked: string,
    ministry_checked: string
    ) {
      let newData = new MessageData(0, river_name,
        image_url, latitude, longitude, upload_from,
        comment, reliability, city_checked, prefecture_checked,
        ministry_checked, null, null);
      let res = await this.httpService.post(this.post_url, JSON.stringify(newData));
      //this.webdto.messageData.push(res);

      // todo 
      // httpサーバ実装後下記不要
      console.log(res);
    }

    async updateData(id: number,
      river_name: string,
      image_url: string,
      latitude: string,
      longitude: string,
      upload_from: string,
      comment: string,
      reliability: number,
      city_checked: string,
      prefecture_checked: string,
      ministry_checked: string
      ){

        let sendData = new MessageData(id, river_name,
          image_url, latitude, longitude, upload_from,
          comment, reliability, city_checked, prefecture_checked,
          ministry_checked, null, null);

        let res = await this.httpService.put(this.put_url, id, JSON.stringify(sendData));
        // this.setDTO(res);

        // todo
        // httpサーバ実装後下記不要
        console.log(res);
      }

    async getAllData(){
      this.webdto.messageData = await this.httpService.get(this.get_url);
    }
    
    private setDTO(res: any){
      for(let i = 0;i < this.webdto.messageData.length; i++) {
        if(res.id === this.webdto.messageData[i].id){
          this.webdto.messageData[i] = res;
          return;
        }
      }

      console.log("Not Found!");
    }


}