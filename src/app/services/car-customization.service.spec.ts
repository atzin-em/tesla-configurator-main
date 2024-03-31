import { TestBed } from '@angular/core/testing';

import { CarCustomizationService } from './car-customization.service';

describe('CarCustomizationService', () => {
  let service: CarCustomizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarCustomizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
