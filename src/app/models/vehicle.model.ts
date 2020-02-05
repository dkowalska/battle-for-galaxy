import {Card} from './card.model';
import {toNumberOrZero} from '../util/to-number';

export class Vehicle extends Card {
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  maxAtmospheringSpeed: string;
  crew: number;
  passengers: number;
  cargoCapacity: number;
  consumables: string;
  vehicleClass: string;
  pilots: number;
  films: number;

  deserialize(input: any): this {
    this.name = input.name;
    this.model = input.model;
    this.manufacturer = input.manufacturer;
    this.costInCredits = toNumberOrZero(input.cost_in_credits);
    this.length = toNumberOrZero(input.length);
    this.maxAtmospheringSpeed = input.max_atmospheric_speed;
    this.crew = toNumberOrZero(input.crew);
    this.passengers = toNumberOrZero(input.passengers);
    this.cargoCapacity = toNumberOrZero(input.cargo_capacity);
    this.consumables = input.consumables;
    this.vehicleClass = input.vehicle_class;
    this.pilots = input.pilots.length;
    this.films = input.films.length;
    return this;
  }
}
