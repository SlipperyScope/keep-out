import { Component, Types } from 'ecsy';

export class Tile extends Component {};
Tile.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  id: { type: Types.String },
  isOccupied: { type: Types.Boolean },
}

export class Path extends Component {};
Path.schema = {
  // Arrays take the form [x,y] and represent coordinates
  from: { type: Types.Array },
  to: { type: Types.Array },
  // Path takes the form of [tile, tile, tile] and represent lol
  path: { type: Types.Array },
}

export class Phaser extends Component {};
Phaser.schema = {
  game: { type: Types.Ref },
}

export class Tower extends Component {};
Tower.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  damage: { type: Types.Number },
  range: { type: Types.Number },
  rateOfFire: { type: Types.Number },
  areaOfEffect: { type: Types.Boolean },
  _pool: {type: Types.Boolean },
}
