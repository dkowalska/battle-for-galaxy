import {Card} from './card.model';
import {toNumberOrZero} from '../util/to-number';

export class Person extends Card {
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  films: number;
  vehicles: number;
  starships: number;

  deserialize(input: any): this {
      this.name = input.name;
      this.height = toNumberOrZero(input.height);
      this.mass = toNumberOrZero(input.mass);
      this.hairColor = input.hair_color;
      this.skinColor = input.skin_color;
      this.eyeColor = input.eye_color;
      this.birthYear = input.birth_year;
      this.gender = input.gender;
      this.films = input.films.length;
      this.vehicles = input.vehicles.length;
      this.starships = input.starships.length;
      return this;
  }
}
