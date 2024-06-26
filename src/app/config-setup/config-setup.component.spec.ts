import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSetupComponent } from './config-setup.component';

describe('ConfigSetupComponent', () => {
  let component: ConfigSetupComponent;
  let fixture: ComponentFixture<ConfigSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
