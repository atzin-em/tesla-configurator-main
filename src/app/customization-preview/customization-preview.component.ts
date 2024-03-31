import { Component } from '@angular/core';
import { CarCustomizationService } from '../services/car-customization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'customization-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customization-preview.component.html',
  styleUrl: './customization-preview.component.scss'
})
export class CustomizationPreviewComponent {
  readonly IMAGE_ENDPOINT = 'https://interstate21.com/tesla-app/images/'

  constructor(private carCustomizationService: CarCustomizationService) {}

  canShow(): boolean {
    return this.carCustomizationService.modelSetupValid;
  }

  get imageSrc(): string {
    return `${this.IMAGE_ENDPOINT}/${this.carCustomizationService.carSummary.model.code}/${this.carCustomizationService.carSummary.model.color.code}.jpg`;
  }
}
