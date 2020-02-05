import {Vehicle} from './vehicle.model';

describe('Vehicle', () => {
  describe('deserialize', () => {
    it('should copy properties of json to Vehicle instance and return it', () => {
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
        vehicle_class: 'testVehicleClass',
        pilots: [],
        films: [],
      };
      // when
      const vehicle = new Vehicle().deserialize(json);
      // then
      expect(vehicle instanceof Vehicle).toBe(true);
      expect(vehicle.name).toEqual('testName');
      expect(vehicle.model).toEqual('testModel');
      expect(vehicle.manufacturer).toEqual('testManufacturer');
      expect(vehicle.costInCredits).toEqual(200);
      expect(vehicle.length).toEqual(122);
      expect(vehicle.maxAtmospheringSpeed).toEqual('testMaxAtmosphericSpeed');
      expect(vehicle.crew).toEqual(12);
      expect(vehicle.passengers).toEqual(56);
      expect(vehicle.cargoCapacity).toEqual(34);
      expect(vehicle.consumables).toEqual('testConsumables');
      expect(vehicle.vehicleClass).toEqual('testVehicleClass');
      expect(vehicle.pilots).toEqual(0);
      expect(vehicle.films).toEqual(0);
    });
  });
});
