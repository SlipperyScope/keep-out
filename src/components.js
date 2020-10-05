import { Component, Types, TagComponent } from 'ecsy';

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
  range: { type: Types.Number, default: 1 },
  damage: { type: Types.Number, default: 10 },
  rateOfFire: { type: Types.Number, default: 4 },
  cooldown: { type: Types.Number },
  areaOfEffect: { type: Types.Boolean },
  price: {type: Types.Number, default: 50},
  _pool: {type: Types.Boolean }, //gamejam btw
}

export class TowerHover extends Component {};
TowerHover.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
}

export class TowerHoverEnd extends Component {};
TowerHoverEnd.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
}

export class Enemy extends Component {};
Enemy.schema = {
  name: { type: Types.String },
  health: { type: Types.Number, default: 3 },
  speed: { type: Types.Number },
  cooldown: {type : Types.Number, default: 10}
}

export class Location extends Component {}
Location.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
}

export class EnemyEmitter extends Component {};
EnemyEmitter.schema = {
  isRunning: { type: Types.Boolean },
  remaining: { type: Types.Number },
  releaseRate: { type: Types.Number },
  cooldown: { type: Types.Number },
}

export class Sprite extends Component {};
Sprite.schema = {
  sprite: {type: Types.Ref}
}
export class Stats extends Component {};
Stats.schema = {
  points: { type: Types.Number },
  health: { type: Types.Number },
  money: { type: Types.Number },
  BAWN: { type: Types.Boolean },
}

export class CheckTower extends TagComponent {};
export class ShowRange extends TagComponent {};