import {Card} from './card.model';
import {toNumberOrZero} from '../util/to-number';

export class Species extends Card {
  name: string;
  classification: string;
  designation: string;
  averageHeight: number;
  skinColors: string;
  hairColors: string;
  eyeColors: string;
  averageLifespan: number;
  language: string;
  people: number;
  films: number;

  deserialize(input: any): this {
    this.name = input.name;
    this.classification = input.classification;
    this.designation = input.designation;
    this.averageHeight = toNumberOrZero(input.average_height);
    this.skinColors = input.skin_colors;
    this.hairColors = input.hair_colors;
    this.eyeColors = input.eye_colors;
    this.averageLifespan = toNumberOrZero(input.average_lifespan);
    this.language = input.language;
    this.people = input.people.length;
    this.films = input.films.length;
    return this;
  }
}
