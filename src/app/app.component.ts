import { Component } from '@angular/core';
// import entire SDK
import * as AWS from 'aws-sdk';
import { ItemList } from 'aws-sdk/clients/dynamodb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simStatus';
  

  constructor() {}

  ngOnInit() {
   
  }
 
}
