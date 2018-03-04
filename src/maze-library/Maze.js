import { Cell } from './Cell'
import _  from 'lodash'

export class Maze {
    constructor(xDimension, yDimension) {
        this.dimensionX = parseInt(xDimension);
        this.dimensionY = parseInt(yDimension);
        this.gridDimensionX = this.dimensionX * 2 + 1;
        this.gridDimensionY = this.dimensionY * 2 + 1;
        this.mazeGrid = [];
        this.cells = [];
        Init.bind(this)();
        GenerateMaze.bind(this)();
    }
    
    get getMaze() {
        return this.mazeGrid;
    }
    get getGridDimensionX() {
        return this.gridDimensionX;
    }
    GetCell(x, y) {
        try{
            if(!(_.isEmpty(this.cells[x][y]))) 
                return this.cells[x][y];
        }
        catch(err) {
            return null;
        }
        return null;
    }

    UpdateGrid() {
        let backChar = ' ', wallChar = 'X', cellChar = ' '
        for(let x = 0; x < this.gridDimensionX; x++) {
            this.mazeGrid[x] = [];
            for(let y = 0; y < this.gridDimensionY; y++) {
                this.mazeGrid[x].push(backChar);
            }
        }
        for(let x = 0; x < this.gridDimensionX; x++) {
            for(let y = 0; y < this.gridDimensionY; y++) { 
                if(x % 2 == 0 || y % 2 == 0) {
                    this.mazeGrid[x][y] = wallChar;
                }
            }
        }
        for(let x = 0; x < this.dimensionX; x++) {
            for(let y = 0; y < this.dimensionY; y++) { 
                let current = this.GetCell(x, y);
                let gridX = x * 2 + 1;
                let gridY = y * 2 + 1;
                this.mazeGrid[gridX][gridY] = cellChar;
                if(current.IsCellBelowNeighbor()) {
                    this.mazeGrid[gridX][gridY + 1] = cellChar;
                }
                if(current.IsCellRightNeighbor()) {
                    this.mazeGrid[gridX + 1][gridY] = cellChar;
                }
            }
        }
    }
}

function Init() {
    for(let x = 0; x < this.dimensionX; x++) {
        this.cells[x] = [];
        for(let y = 0; y < this.dimensionY; y++) {
            this.cells[x].push(new Cell(x, y, false));
        }
    }
}

function GenerateMaze(x = 0, y = 0) {
    let startAt = this.GetCell(x, y);
    if (startAt == null) {
        return;
    }
    startAt.open = false;
    let cellsList = [];
    cellsList.push(startAt);
    while(cellsList.length > 0) {
        let cell = cellsList[cellsList.length - 1];
        cellsList = cellsList.filter(e => e != cell);
        let neighbors = [];
        let potentialNeighbors = [];
        potentialNeighbors.push(this.GetCell(cell.x + 1, cell.y));
        potentialNeighbors.push(this.GetCell(cell.x, cell.y + 1));
        potentialNeighbors.push(this.GetCell(cell.x - 1, cell.y));
        potentialNeighbors.push(this.GetCell(cell.x, cell.y - 1));
        for(let other of  potentialNeighbors) {
            if(other === null || other.wall || !other.open)
                continue;
            neighbors.push(other);
        }
        if(neighbors.length === 0) continue;
        let selected = neighbors[Math.floor(Math.random() * neighbors.length)];
        selected.open = false;
        cell.AddNeighbor(selected);
        cellsList.push(cell);
        cellsList.push(selected);
    }
    this.UpdateGrid.bind(this)();
}