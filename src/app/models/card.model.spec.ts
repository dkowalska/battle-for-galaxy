import {Card} from './card.model';

describe('Card', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Card instance and return it', () => {
      // given
      const json = {name: 'testName'};
      // when
      const card = new Card().deserialize(json);
      // then
      expect(card instanceof Card).toBe(true);
      expect(card.name).toEqual('testName');
    });
  });
});
