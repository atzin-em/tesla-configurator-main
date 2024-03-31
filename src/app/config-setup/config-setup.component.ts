import { Component } from '@angular/core';
import { CarConfiguration, CarOption, CarOptions } from '../interfaces';
import { FormGroup, AbstractControl, FormControl, Validators, FormControlStatus, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarCustomizationService } from '../services/car-customization.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { createSelectValidator } from '../validators/create-select-validator';

@Component({
  selector: 'config-setup',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule, 
    MatInputModule, 
    MatSelectModule, 
    MatFormFieldModule,
    MatCheckboxModule
  ],
  templateUrl: './config-setup.component.html',
  styleUrl: './config-setup.component.scss',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class ConfigSetupComponent {
  private readonly nullOptions: CarOptions = { configs: [], towHitch: false, yoke: false };
  private readonly nullConfig: CarConfiguration = {
    id: 0,
    description: '',
    range: 0,
    speed: 0,
    price: 0
  };
  private carOptions: CarOptions = { configs: [], towHitch: false, yoke: false }
  towAvailable: boolean = false;
  yokeAvailable: boolean = false;
  selectedOption: CarOption; // = { 

  status: boolean = false;
  carOptionText: string = "";
  configForm: FormGroup;

  get carConfigs(): CarConfiguration[] {
    return this.carOptions['configs'];
  }

  private get configSelect(): AbstractControl<CarConfiguration> {
    return this.configForm.get('configSelect') as AbstractControl;
  }

  private get towCheck(): AbstractControl<boolean> {
    return this.configForm.get('towCheck') as AbstractControl;
  }

  private get yokeCheck(): AbstractControl<boolean> {
    return this.configForm.get('yokeCheck') as AbstractControl;
  }

  constructor(private customizationService: CarCustomizationService) {
    this.selectedOption = {
      config: customizationService.carSummary.config,
      towHitch: customizationService.carSummary.towHitch,
      yoke: customizationService.carSummary.yoke
    }
    this.configForm = new FormGroup({
      configSelect: new FormControl<CarOptions>(this.nullOptions, createSelectValidator(this.carConfigs)),
      towCheck: new FormControl<boolean>(false, Validators.required),
      yokeCheck: new FormControl<boolean>(false, Validators.required)
    });

    customizationService.getCarOptions().subscribe(
      response => {
        this.carOptions = response;
        this.towAvailable = response.towHitch;
        this.yokeAvailable = response.yoke
        this.configSelect.clearValidators();
        this.configSelect.addValidators(createSelectValidator(this.carConfigs));
        this.configSelect.setValue(this.carOptions.configs.find(config => config.id == customizationService.carSummary.config.id) || this.nullConfig);
        this.towCheck.setValue(customizationService.carSummary.towHitch);
        this.yokeCheck.setValue(customizationService.carSummary.yoke);
      }
    );

    this.configForm.statusChanges.subscribe((status: FormControlStatus) => {
      if (status === 'VALID') {
        this.status = true;
        customizationService.configSetupValidated(this.configSelect.value, this.towCheck.value, this.yokeCheck.value)
        this.carOptionText = `Range: ${this.configSelect.value.range} miles - Max Speed: ${this.configSelect.value.speed} - Cost: ${this.configSelect.value.price?.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0})}`;
      }
    })
  }

}


