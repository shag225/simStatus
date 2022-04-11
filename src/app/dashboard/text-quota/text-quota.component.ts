import { Component, Input, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { TextQuotaService } from 'src/app/services/text-quota.service';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-quota',
  templateUrl: './text-quota.component.html',
  styleUrls: ['./text-quota.component.scss']
})
export class TextQuotaComponent implements OnInit {
  quota: any |undefined;
  copied = false;
  color = 'primary';
  simQuotaSub: Subscription;
  simQuota: any;
  constructor(private textBeltService: TextQuotaService, private _mqttService: MqttService) { 
    this.simQuotaSub = this._mqttService.observe('simQuota').subscribe((message: IMqttMessage) => {
      //this.statusList?.push(message);
      if(message.payload.toString() === 'checkQuota') {
        this.checkQuota();
      }
    })
  }

  ngOnInit(): void {
    this.checkQuota();
    AWS.config.update({accessKeyId: 'AKIA6A7R6T3H5FBKELFC', secretAccessKey: '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'});
    // Configure the region
    AWS.config.region = 'us-east-1';
    //create the ddb object
    var ddb = new AWS.DynamoDB();

    var params = {
      TableName: 'simQuota',
      Key: {
        'desc': {S: 'quota'}
      },
    };

    ddb.getItem(params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Scan succeeded.");
        let test: any = data.Item;
        //console.log(test);
        //this.quota = test.remainingQuota.S;

        // continue scanning if we have more items
       /* if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }*/
       
      }
    });
  }

  copy() {
    this.copied = true
    this.color = 'accent';
    setTimeout(() => {
      this.copied = false;
      this.color = 'primary';
    }, 3000);
  }

  checkQuota() {
    this.textBeltService.getQuota().subscribe((response: any) => {
      console.log(response);
      this.quota = response.quotaRemaining;
    });
  }

}
