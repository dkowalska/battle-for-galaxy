import {Card} from './card.model';

export class Film extends Card {
  title: string;
  episodeId: string;
  director: string;
  producer: string;
  releaseDate: string;
  characters: number;
  planets: number;
  starships: number;
  vehicles: number;
  species: number;

  deserialize(input: any): this {
    this.title = input.title;
    this.episodeId = input.episode_id;
    this.director = input.director;
    this.producer = input.producer;
    this.releaseDate = input.release_date;
    this.characters = input.characters.length;
    this.planets = input.planets.length;
    this.starships = input.starships.length;
    this.vehicles = input.vehicles.length;
    this.species = input.species.length;
    return this;
  }
}
