import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CarModelsResponse, CustomizationSteps, CarOptions, CarConfiguration, CarModel} from '../interfaces';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CarSummary } from '../interfaces/car-summary';


@Injectable({
  providedIn: 'root'
})
export class CarCustomizationService {

  canActivate(routeIndex: number): boolean {
    let boolVal: boolean = this.customizationSteps[routeIndex].valueOf()
    return boolVal;
  }

  private customizationSteps: CustomizationSteps = {
      0: true,
      1: false,
      2: false
  }

  carSummary: CarSummary = {
    model: { code: '', description: '', color: { code: '', description: '', price: 0 } },
    config: { id: 0, description: '', range: 0, speed: 0, price: 0},
    towHitch: false,
    yoke: false
  }

  modelSetupValidated(model: CarModel) {
    this.carSummary.model = model;
    this.customizationSteps[1] = true;
  }

  get modelSetupValid(): boolean {
    return this.customizationSteps[1];
  }

  configSetupValidated(config: CarConfiguration, tow: boolean, yoke: boolean) {
    this.carSummary.config = config;
    this.carSummary.towHitch = tow;
    this.carSummary.yoke = yoke
    this.customizationSteps[2] = true;
  }

  constructor(private http: HttpClient) { }

  getCarOptions(): Observable<CarOptions> {
    let modelId: string = this.carSummary.model.code;
    return this.http.get<CarOptions>(`/options/${modelId}`);
  }

  getCarModels(): Observable<CarModelsResponse> {
    return this.http.get<CarModelsResponse>('/models');
  }
}

export const ActivateCheck: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    // Injecting the Router to access its config
    const router = inject(Router);
    // Using the injected router's config to pass onto the comparison with the customizationSteps property
    return inject(CarCustomizationService)
      .canActivate(router.config
      .filter(routes => routes.component)
      .findIndex(routes => routes.path == route.routeConfig?.path));
};