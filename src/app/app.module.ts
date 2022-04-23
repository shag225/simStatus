import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import {
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqttServer,
  port: 9001,
  path: '/mqtt'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
