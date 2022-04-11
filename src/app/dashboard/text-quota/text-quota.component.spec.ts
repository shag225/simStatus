import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuotaComponent } from './text-quota.component';

describe('TextQuotaComponent', () => {
  let component: TextQuotaComponent;
  let fixture: ComponentFixture<TextQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextQuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
