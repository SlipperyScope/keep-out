import { System } from 'ecsy';
import { Tile } from '../components';

export default class GridSystem extends System {
  execute(delta) {
    const tiles = this.queries.tiles.results;
    console.table(tiles.map(t => t.getComponent(Tile)));
  }
}

GridSystem.queries = {
  tiles: { components: [Tile] }
}
