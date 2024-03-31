import { CarConfiguration } from "./car-configuration";
import { CarModel } from "./car-models";

export interface CarSummary {
    model: CarModel;
    config: CarConfiguration;
    towHitch: boolean;
    yoke: boolean;
}