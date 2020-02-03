import {Person} from './person.model';

describe('Person', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Person instance and return it', () => {
      // given
      const json = {
        name: 'testName',
        height: '1',
        mass: '1',
        hair_color: 'testHairColor',
        skin_color: 'testSkinColor',
        eye_color: 'testEyeColor',
        birth_year: 'testBirthYear',
        gender: 'testGender',
        films: [],
        vehicles: [],
        starships: [],
      };
      // when
      const person = new Person().deserialize(json);
      // then
      expect(person instanceof Person).toBe(true);
      expect(person.name).toEqual('testName');
      expect(person.height).toEqual(1);
      expect(person.mass).toEqual(1);
      expect(person.hairColor).toEqual('testHairColor');
      expect(person.skinColor).toEqual('testSkinColor');
      expect(person.eyeColor).toEqual('testEyeColor');
      expect(person.birthYear).toEqual('testBirthYear');
      expect(person.gender).toEqual('testGender');
      expect(person.films).toEqual(0);
      expect(person.vehicles).toEqual(0);
      expect(person.starships).toEqual(0);
    });
  });
});
