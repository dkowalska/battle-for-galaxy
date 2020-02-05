import {Planet} from './planet.model';

describe('Planet', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Planet instance and return it', () => {
      // given
      const json = {
        name: 'testName',
        rotation_period: '1',
        orbital_period: '1',
        diameter: '1',
        climate: 'testClimate',
        gravity: 'testGravity',
        terrain: 'testTerrain',
        surface_water: '1',
        population: '1',
        residents: [],
        films: []
      };
      // when
      const planet = new Planet().deserialize(json);
      // then
      expect(planet instanceof Planet).toBe(true);
      expect(planet.name).toEqual('testName');
      expect(planet.rotationPeriod).toEqual(1);
      expect(planet.orbitalPeriod).toEqual(1);
      expect(planet.diameter).toEqual(1);
      expect(planet.population).toEqual(1);
      expect(planet.climate).toEqual('testClimate');
      expect(planet.gravity).toEqual('testGravity');
      expect(planet.terrain).toEqual('testTerrain');
      expect(planet.surfaceWater).toEqual(1);
      expect(planet.residents).toEqual(0);
      expect(planet.films).toEqual(0);
    });
  });
});
