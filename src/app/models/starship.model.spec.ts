import {Starship} from './starship.model';

describe('Starship', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Starship instance and return it', () => {
      // given
      const json = {
        name: 'testName',
        model: 'testModel',
        manufacturer: 'testManufacturer',
        cost_in_credits: '200',
        length: '122',
        max_atmospheric_speed: 'testMaxAtmosphericSpeed',
        crew: '12',
        passengers: '56',
        cargo_capacity: '34',
        consumables: 'testConsumables',
        hyperdrive_rating: 'testHyperdriveRating',
        MGLT: '20',
        starship_class: 'testStarshipClass',
        pilots: [],
        films: [],
      };
      // when
      const starship = new Starship().deserialize(json);
      // then
      expect(starship instanceof Starship).toBe(true);
      expect(starship.name).toEqual('testName');
      expect(starship.model).toEqual('testModel');
      expect(starship.manufacturer).toEqual('testManufacturer');
      expect(starship.costInCredits).toEqual(200);
      expect(starship.length).toEqual(122);
      expect(starship.maxAtmospheringSpeed).toEqual('testMaxAtmosphericSpeed');
      expect(starship.crew).toEqual(12);
      expect(starship.passengers).toEqual(56);
      expect(starship.cargoCapacity).toEqual(34);
      expect(starship.consumables).toEqual('testConsumables');
      expect(starship.hyperdriveRating).toEqual('testHyperdriveRating');
      expect(starship.MGLT).toEqual(20);
      expect(starship.starshipClass).toEqual('testStarshipClass');
      expect(starship.pilots).toEqual(0);
      expect(starship.films).toEqual(0);
    });
  });
});
