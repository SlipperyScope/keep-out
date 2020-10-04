import { System } from 'ecsy';
import { Tile, Path } from '../components';
import ngraph from 'ngraph.graph';
import { aStar } from 'ngraph.path';

export default class GridSystem extends System {
  constructor() {
    super(...arguments);
    this.graph = ngraph();
    this.pathFinder = aStar(this.graph);
  }

  // Given a grid and coordinates, return all the tiles that are neighbors
  // This is ALL neighbors, occupied or not.
  getNeighbors(x, y) {
    const neighbors = [];
    if (x > 0) neighbors.push(this.grid[`${x-1},${y}`]);
    if (x < this.width) neighbors.push(this.grid[`${x+1},${y}`]);
    if (y > 0) neighbors.push(this.grid[`${x},${y-1}`]);
    if (y < this.height) neighbors.push(this.grid[`${x},${y+1}`]);
    return neighbors;
  }

  updateGraphState() {
    const tiles = this.queries.tiles.results;

    // This is probably inefficient, but GAME JAM
    // Index tiles by their ID for quick lookups when verifying edges and such
    this.width = 0;
    this.height = 0;
    this.grid = tiles.reduce((hash, t) => {
      const { id, x, y } = t.getComponent(Tile);
      hash[id] = t;
      if (x > this.width) this.width = x;
      if (y > this.height) this.height = y;
      return hash;
    }, {});

    this.queries.tiles.added.forEach(ent => {
      const tile = ent.getComponent(Tile);
      this.graph.addNode(tile.id, { x: tile.x, y: tile.y });
      if (!tile.isOccupied) {
        const neighbors = this.getNeighbors(tile.x, tile.y);
        neighbors.forEach(neighbor => {
          const nid = neighbor.getComponent(Tile).id;
          const alreadyLinked = this.graph.hasLink(tile.id, nid) || this.graph.hasLink(nid, tile.id);
          if (!neighbor.getComponent(Tile).isOccupied && !alreadyLinked) {
            this.graph.addLink(tile.id, nid);
          }
        });
      }
    });

    this.queries.tiles.removed.forEach(ent => {
      const tile = ent.getComponent(Tile);
      this.graph.removeNode(tile.id);
    });

    this.queries.tiles.changed.forEach(ent => {
      const tile = ent.getComponent(Tile);
      if (tile.isOccupied) {
        // Remove edges
        const toRemove = [];
        this.graph.forEachLink(link => {
          if (link.fromId === tile.id || link.toId === tile.id) {
            toRemove.push(link);
          }
        });
        while (toRemove.length) {
          this.graph.removeLink(toRemove.shift());
        }
      } else {
        // Add edges
        const neighbors = this.getNeighbors(tile.x, tile.y);
        neighbors.forEach(neighbor => {
          if (!neighbor.getComponent(Tile).isOccupied) {
            this.graph.addLink(tile.id, neighbor.getComponent(Tile).id);
          }
        });
      }
    });
  }

  providePathing() {
    this.queries.providePathing.added.forEach(ent => {
      const path = ent.getMutableComponent(Path);
      console.log('Pathing', path);
      if (!path.path.length && path.from && path.to) {
        const nodes = this.pathFinder.find(path.from.join(','), path.to.join(','));
        path.path = nodes.reverse().map(n => n.id.split(',').map(Number));
        console.log('Path!', path.from, path.to);
        this.printPath(path.path);
      }
    });
  }

  execute() {
    this.updateGraphState();
    this.providePathing();
  }

  printPath(path) {
    const rows = [];
    for (let y = 0; y <= this.height; y++) {
      const row = [];
      for (let x = 0; x <= this.width; x++) {
        if (this.grid[`${x},${y}`].getComponent(Tile).isOccupied) {
          row.push('▦');
        } else if (path.find(n => n[0] === x && n[1] === y)){
          row.push('▣'); // The path
        } else {
          row.push('▢');
        }
      }
      rows.push(row.join(''));
    }
    console.log(rows.join('\n'));
  }
}

GridSystem.queries = {
  tiles: { components: [Tile], listen: { added: true, removed: true, changed: true } },
  providePathing: { components: [Path], listen: { added: true } }
}
