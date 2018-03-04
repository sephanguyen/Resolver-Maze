import _  from 'lodash'

export class Cell {

    constructor(x, y, wall = true) {
        this.x = x;
        this.y = y;
        this.wall = wall;
        this.open = true;
        this.neighbors = [];
    }

    AddNeighbor(other) {
        if(other instanceof Cell) {
            if(!(_.some(this.neighbors, {'x' : other.x, 'y' : other.y}))){
                this.neighbors.push(other);
            }
            if(!(_.some(other.neighbors, {'x' : this.x, 'y' : this.y}))) {
                other.neighbors.push(this);
            }
        }
    }

    IsCellBelowNeighbor() {
        return _.some(this.neighbors, {'x' : this.x, 'y' : this.y + 1});
    }
    
    IsCellRightNeighbor() {
        return _.some(this.neighbors, {'x' : this.x + 1, 'y' : this.y});
    }

}