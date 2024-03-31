import { Component } from '@angular/core';
import { CarCustomizationService } from '../services/car-customization.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { AbstractControl, FormControlStatus, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { CarColorOption, CarModel, CarModels, CarModelsResponse } from '../interfaces';
import { createSelectValidator } from '../validators/create-select-validator';

@Component({
  selector: 'model-setup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './model-setup.component.html',
  styleUrl: './model-setup.component.scss',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class ModelSetupComponent {
  readonly nullModel: CarModels = { code: '', description: '', colors: [] };
  readonly nullColor: CarColorOption = { code: '', description: '', price: -1 };
  carModels: CarModelsResponse = [];
  modelForm: FormGroup;

  get modelSelect(): AbstractControl<CarModels> {
    return this.modelForm.get('modelSelect') as AbstractControl;
  }

  get colorSelect(): AbstractControl<CarColorOption> {
    return this.modelForm.get('colorSelect') as AbstractControl;
  }

  constructor(private customizationService: CarCustomizationService) {
    customizationService.getCarModels().subscribe(
      response => { 
        this.carModels = response
        this.modelSelect.clearValidators();
        this.modelSelect.addValidators(createSelectValidator(this.carModels));
        this.colorSelect.clearValidators();
        this.colorSelect.addValidators(createSelectValidator(this.carModels.flatMap(model => model.colors)));
        this.modelSelect.setValue(this.carModels.find(model => model.code == customizationService.carSummary.model.code) || this.nullModel)
        this.colorSelect.setValue(this.modelSelect.value.colors.find(color => color.code == customizationService.carSummary.model.color.code) || this.nullColor)
      }
    );
    this.modelForm = new FormGroup({
      modelSelect: new FormControl<CarModels>(this.nullModel, Validators.required),
      colorSelect: new FormControl<CarColorOption>(this.nullColor, Validators.required)
    });
    this.colorSelect.disable();

    this.modelSelect.valueChanges.subscribe((model): void => {
      if (customizationService.carSummary.model.code != '') {
        if (customizationService.carSummary.model.code != model.code) {
          this.setToFirst();
        }
      }

      if (model.code != '') {
        if (customizationService.carSummary.model.color.code == '') {
          this.setToFirst();
        }

        this.colorSelect.enable();
      }
    })

    this.modelForm.statusChanges.subscribe((status: FormControlStatus): void => {
      if (status === 'VALID') {
        let carModel: CarModel = { code: '', description: '', color: this.nullColor };
        carModel.code = this.modelSelect.value.code;
        carModel.description = this.modelSelect.value.description;
        carModel.color = this.colorSelect.value;
        customizationService.modelSetupValidated(carModel)
      }
    })
  }

  setToFirst(): void {
    this.colorSelect.setValue(this.modelSelect.value.colors[0]);
  }

}
