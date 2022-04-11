import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../modules/material.module';
import { TextQuotaComponent } from '../dashboard/text-quota/text-quota.component';
import { DeviceHealthComponent } from '../dashboard/device-health/device-health.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    DashboardComponent,
    TextQuotaComponent,
    DeviceHealthComponent
  ],
  imports: [
    CommonModule,
    MatBadgeModule,
    FontAwesomeModule,
    MaterialModule,
    ClipboardModule
  ],
  exports: [
    DashboardComponent,
    TextQuotaComponent,
    DeviceHealthComponent
  ]
})
export class DashboardModule { }
