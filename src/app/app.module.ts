import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './service/httpservice.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeoService } from './service/geoService/geoservice.service';
import { AuthService } from './service/auth/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MessageWebDTO } from './service/messageService/message.webdto';
import { MessageManagerService } from './service/messageService/messagemanager.service';
import { AlertController } from '@ionic/angular';
import { UserinputWebDTO } from './service/userinputService/userinput.webdto';
import { OfficialinputWebDTO } from './service/officialinputService/officialinput.webdto';
import { UserinputData} from './dto/userinput.data';
import { OfficialinputData } from './dto/officialinput.data';


import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
firebase.initializeApp(environment.firebase);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireAuthModule, ReactiveFormsModule,
    HttpModule ],
  providers: [
    HttpService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    GeoService,
    AuthService,
    MessageWebDTO,
    MessageManagerService,
    AlertController,
    UserinputData,
    UserinputWebDTO,
    OfficialinputData,
    OfficialinputWebDTO
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
