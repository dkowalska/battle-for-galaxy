import {Species} from './species.model';

describe('Species', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Species instance and return it', () => {
      // given
      const json = {
        name: 'testName',
        classification: 'testClassification',
        designation: 'testDesignation',
        average_height: '1',
        skin_colors: 'testSkinColors',
        hair_colors: 'testHairColors',
        eye_colors: 'testEyeColors',
        average_lifespan: '1',
        language: 'testLanguage',
        people: [],
        films: []
      };
      // when
      const planet = new Species().deserialize(json);
      // then
      expect(planet instanceof Species).toBe(true);
      expect(planet.name).toEqual('testName');
      expect(planet.classification).toEqual('testClassification');
      expect(planet.designation).toEqual('testDesignation');
      expect(planet.averageHeight).toEqual(1);
      expect(planet.skinColors).toEqual('testSkinColors');
      expect(planet.hairColors).toEqual('testHairColors');
      expect(planet.eyeColors).toEqual('testEyeColors');
      expect(planet.averageLifespan).toEqual(1);
      expect(planet.language).toEqual('testLanguage');
      expect(planet.people).toEqual(0);
      expect(planet.films).toEqual(0);
    });
  });
});
