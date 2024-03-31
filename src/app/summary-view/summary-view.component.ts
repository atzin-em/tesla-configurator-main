import { Component } from '@angular/core';
import { CarCustomizationService } from '../services/car-customization.service';
import { CurrencyPipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'summary-view',
  standalone: true,
  imports: [CurrencyPipe, KeyValuePipe],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.scss'
})
export class SummaryViewComponent {
  modelName: string;
  configName: string;
  configPrice: number;
  colorName: string;
  colorPrice: number;
  extraOptions: extraOptionsDictionary<boolean> = {};

  constructor(private carCustomizationService: CarCustomizationService) {
    let carSummary = carCustomizationService.carSummary;
    this.modelName = carSummary.model.description;
    this.configName = carSummary.config.description;
    this.configPrice = carSummary.config.price;
    this.colorName = carSummary.model.color.description;
    this.colorPrice = carSummary.model.color.price;
    this.extraOptions["tow"] = carSummary.towHitch;
    this.extraOptions["yoke"] = carSummary.yoke;
  }
  get totalCost(): number {
    let totalCost: number = (this.configPrice + this.colorPrice) + (Object.values(this.extraOptions).filter(val => val == true).length * 1000);
    return totalCost;
  }
}

type extraOptionsDictionary<T> = {
  [key: string]: T;
};