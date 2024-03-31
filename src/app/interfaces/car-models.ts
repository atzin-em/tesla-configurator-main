import { CarColorOption } from "./car-color-options";

export interface CarModels {
    code: string;
    description: string;
    colors: CarColorOption[];
}

export interface CarModel {
    code: string;
    description: string;
    color: CarColorOption;
}