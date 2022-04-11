import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable, Subscription } from 'rxjs';
import * as AWS from 'aws-sdk';
import { ItemList } from 'aws-sdk/clients/dynamodb';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-device-health',
  templateUrl: './device-health.component.html',
  styleUrls: ['./device-health.component.scss']
})
export class DeviceHealthComponent implements OnInit, OnDestroy {
  @Input() systems: ItemList|undefined;
  systemsArray: any[] = [];
  initialPingSub: Subscription|undefined;
  simStatusSub: Subscription;
  simStatus: any;
  reelyActiveSub: Subscription;
  reelyActiveStatus: any;
  homebridgeSub: Subscription;
  homebridgeStatus: any;
  thermostatSub: Subscription;
  thermostatus: any;
  camSub: Subscription;
  camStatus: any;
  message: string | undefined;
  status!: string;
  statusList: any[] = [];
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  
  constructor(private _mqttService: MqttService) { 
    this.simStatusSub = this._mqttService.observe('simStatus').subscribe((message: IMqttMessage) => {
      //this.statusList?.push(message);
      if(message.payload.toString() === 'ok') {
        this.simStatus = true;
      } else {
        this.simStatus = false;
      }
      this.statusList.push(message.payload.toString());
      let test = JSON.stringify(this.statusList);
      localStorage.setItem('status', test);
      setInterval(() => {
        let status = localStorage.getItem('status');
        if(status) {
          //console.log(this.statusList, status);
          this.statusList = JSON.parse(status);
        }
      }, 100);
    });

    this.reelyActiveSub = this._mqttService.observe('reelyActiveStatus').subscribe((message: IMqttMessage) => {
      //this.statusList?.push(message);
      if(message.payload.toString() === 'ok') {
        this.reelyActiveStatus = true;
      } else {
        this.reelyActiveStatus = false;
      }
     
    });

    this.homebridgeSub = this._mqttService.observe('homebridgeStatus').subscribe((message: IMqttMessage) => {
      //this.statusList?.push(message);
      if(message.payload.toString() === 'ok') {
        this.homebridgeStatus = true;
      } else {
        this.homebridgeStatus = false;
      }
    });

    this.thermostatSub = this._mqttService.observe('thermostatus').subscribe((message: IMqttMessage) => {
      //this.statusList?.push(message);
      if(message.payload.toString() === 'ok') {
        this.thermostatus = true;
      } else {
        this.thermostatus = false;
      }
    });

    this.camSub = this._mqttService.observe('camStatus').subscribe((message: IMqttMessage) => {
      //this.statusList?.push(message);
      if(message.payload.toString() === 'ok') {
        this.camStatus = true;
      } else {
        this.camStatus = false;
      }
    });

    
    
  }

  async ngOnInit() {

     this.systems?.forEach((system) => {
        if(system['status_topic'].S) {
          this._mqttService.observe(system['status_topic'].S).subscribe((message: IMqttMessage) => {
            //this.statusList?.push(message);
            if(message.payload.toString() === 'ok') {
              system['status'] = {B: true};
            
            } else {
              system['status'] = {B: false};
            }
          });
        }
        

        let topic = system['status_topic'].S!.toString();
        console.log(topic)
        let test$: Observable<any> = this._mqttService.publish(topic, 'ping');
        this.initialPingSub = test$.subscribe((response) => {
          if(response) {
            this.initialPingSub?.unsubscribe();
          }
        });
      })
      console.log(this.systems);
     
    }


  

  ngOnDestroy() {
    this.simStatusSub.unsubscribe();
  }
}
