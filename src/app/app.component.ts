import {Component} from '@angular/core';
import { CarCustomizationService } from './services/car-customization.service';
import { CanActivateChildFn, CanActivateFn, Router, RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { CustomizationPreviewComponent } from './customization-preview/customization-preview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CustomizationPreviewComponent,
    MatTabsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly name: string = 'tesla-configurator';
  activeLink: number = 0;
  routes: string[] = [];

  constructor(private carCustomizationService: CarCustomizationService, private router: Router) {
    
    this.routes = this.router.config
      .filter(routes => routes.component)
      .map(routes => (routes.path) ? routes.path : "" )
  }

  linkClick(idx: number) {
    this.activeLink = idx;
  }

  canActivate(index: number): boolean {
    return !this.carCustomizationService.canActivate(index);
  }
}
