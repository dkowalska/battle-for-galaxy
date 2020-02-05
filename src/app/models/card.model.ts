import {Deserializable} from './deserializable.model';

export class Card implements Deserializable {
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
