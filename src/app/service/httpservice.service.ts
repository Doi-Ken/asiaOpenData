import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

     constructor(
        private http: Http
    ) { }



    // 取得
    async get(url: string): Promise<any[]>{
        return this.http.get(url).toPromise()
        .then(this.extractData)
        .catch(this.handlerError);
   }

    // 登録
    async post(url: string, jsondata: string): Promise<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, jsondata).toPromise()
                .then(this.extractData)
                .catch(this.handlerError);
    }

    private extractData(res: Response){
        let body = res.json();
        return body || {};
    }

    private handlerError(error: Response | any) {
        console.log(error.toString());
        return Observable.throw(error.toString());
    }
  
}