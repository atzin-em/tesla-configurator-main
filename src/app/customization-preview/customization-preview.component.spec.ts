import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationPreviewComponent } from './customization-preview.component';

describe('CustomizationPreviewComponent', () => {
  let component: CustomizationPreviewComponent;
  let fixture: ComponentFixture<CustomizationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizationPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
