import {Starship} from '../app/models/starship.model';

export class StarshipsFactory {
  static getStarshipWithBigCrew() {
    return new Starship().deserialize(StarshipsFactory.getStarshipWithBigCrewJSON());
  }

  static getStarshipWithBigCrewJSON() {
    return {
      name: 'Starship With Big Crew',
      model: 'testModel',
      manufacturer: 'testManufacturer',
      cost_in_credits: '200',
      length: '122',
      max_atmospheric_speed: 'testMaxAtmosphericSpeed',
      crew: '22',
      passengers: '56',
      cargo_capacity: '34',
      consumables: 'testConsumables',
      hyperdrive_rating: 'testHyperdriveRating',
      MGLT: '20',
      starship_class: 'testStarshipClass',
      pilots: [],
      films: [],
    };
  }

  static getStarshipWithSmallCrew() {
    return new Starship().deserialize(StarshipsFactory.getStarshipWithSmallCrewJSON());

  }

  static getStarshipWithSmallCrewJSON() {
    return {
      name: 'Starship With Small Crew',
      model: 'testModel',
      manufacturer: 'testManufacturer',
      cost_in_credits: '200',
      length: '122',
      max_atmospheric_speed: 'testMaxAtmosphericSpeed',
      crew: '2',
      passengers: '56',
      cargo_capacity: '34',
      consumables: 'testConsumables',
      hyperdrive_rating: 'testHyperdriveRating',
      MGLT: '20',
      starship_class: 'testStarshipClass',
      pilots: [],
      films: [],
    };
  }
}
