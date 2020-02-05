import {Card} from './card.model';
import {toNumberOrZero} from '../util/to-number';

export class Planet extends Card {
  name: string;
  rotationPeriod: number;
  orbitalPeriod: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surfaceWater: number;
  population: number;
  residents: number;
  films: number;

  deserialize(input: any): this {
    this.name = input.name;
    this.rotationPeriod = toNumberOrZero(input.rotation_period);
    this.orbitalPeriod = toNumberOrZero(input.orbital_period);
    this.diameter = toNumberOrZero(input.diameter);
    this.climate = input.climate;
    this.gravity = input.gravity;
    this.terrain = input.terrain;
    this.surfaceWater = toNumberOrZero(input.surface_water);
    this.population = toNumberOrZero(input.population);
    this.residents = input.residents.length;
    this.films = input.films.length;
    return this;
  }
}
