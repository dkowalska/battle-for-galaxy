import {Film} from './film.model';

describe('Film', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Film instance and return it', () => {
      // given
      const json = {
        title: 'testTitle',
        episode_id: 'testEpisodeId',
        director: 'testDirector',
        producer: 'testProducer',
        release_date: 'testReleaseDate',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: []
      };
      // when
      const film = new Film().deserialize(json);
      // then
      expect(film instanceof Film).toBe(true);
      expect(film.title).toEqual('testTitle');
      expect(film.episodeId).toEqual('testEpisodeId');
      expect(film.director).toEqual('testDirector');
      expect(film.producer).toEqual('testProducer');
      expect(film.releaseDate).toEqual('testReleaseDate');
      expect(film.characters).toEqual(0);
      expect(film.planets).toEqual(0);
      expect(film.starships).toEqual(0);
      expect(film.vehicles).toEqual(0);
      expect(film.species).toEqual(0);
    });
  });
});
