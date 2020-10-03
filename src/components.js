import { Component, Types } from 'ecsy';

export class Tile extends Component {};
Tile.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  id: { type: Types.String },
  isOccupied: { type: Types.Boolean },
}
}
