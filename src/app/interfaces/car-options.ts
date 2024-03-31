import { CarConfiguration } from "./car-configuration";

export interface CarOptions {
    configs: CarConfiguration[];
    towHitch: boolean;
    yoke: boolean;
}

export interface CarOption {
    config: CarConfiguration;
    towHitch: boolean;
    yoke: boolean;
}