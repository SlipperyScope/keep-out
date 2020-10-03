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
