import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSetupComponent } from './model-setup.component';

describe('ModelSetupComponent', () => {
  let component: ModelSetupComponent;
  let fixture: ComponentFixture<ModelSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
