import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

import * as AWS from 'aws-sdk';
import { ItemList } from 'aws-sdk/clients/dynamodb';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  quota: string | undefined;
  systems: ItemList| undefined;
  message: string | undefined;
  status!: string;
  statusList: any[] = [];

  constructor(private _mqttService: MqttService) {}

  ngOnInit(): void {
    AWS.config.update({accessKeyId: 'AKIA6A7R6T3H5FBKELFC', secretAccessKey: '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'});
    // Configure the region
    AWS.config.region = 'us-east-1';
    //create the ddb object
    var ddb = new AWS.DynamoDB();

   var params = {
      TableName: "systems"
    };

    ddb.scan(params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Scan succeeded.");
        this.systems = data.Items;
      }
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }
}
