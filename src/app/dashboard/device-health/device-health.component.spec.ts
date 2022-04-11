import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHealthComponent } from './device-health.component';

describe('DeviceHealthComponent', () => {
  let component: DeviceHealthComponent;
  let fixture: ComponentFixture<DeviceHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
