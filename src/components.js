import { Component, Types } from 'ecsy';

export class Tile extends Component {};
Tile.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  up: { type: Types.Boolean },
  right: { type: Types.Boolean },
  down: { type: Types.Boolean },
  left: { type: Types.Boolean },
  occupied: { type: Types.Boolean },
}
