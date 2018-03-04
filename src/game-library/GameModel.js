import { Maze } from '../maze-library/Maze'
import _  from 'lodash'

const EMPTY = 0;
const OBST = 1;
const ROBOT = 2;
const TARGET = 3;

export class GameModel {
     constructor(rows, cols, makeMaze = false) { 
         this.rows = rows;
         this.colums = cols;
         this.makeMaze = makeMaze;
         if(makeMaze && rows % 2 === 0) 
            this.rows -= 1;
         if(makeMaze && cols % 2 === 0)
            this.colums -= 1;
         this.squareSize = parseInt((500 / (this.rows > this.colums ? this.rows  : this.colums)));
         this.arrowSize = parseInt(this.squareSize / 2);
         this.robotStart =  {row : this.rows - 2, col : 1};
         this.targetPos = {row : 1, col: this.colums -2};
         this.grid = [];
         FillGrid.bind(this)();
     }
     get getGrid() {
        return this.grid;
    }
}

function FillGrid() {
    for(let x = 0; x < this.rows; x++) {
        this.grid[x] = [];
        for(let y = 0; y < this.colums; y++) {
            this.grid[x].push(EMPTY);
        }
    }
    this.grid[this.robotStart.row][this.robotStart.col] = ROBOT;
    this.grid[this.targetPos.row][this.targetPos.col] = TARGET;
    if(this.makeMaze) {
        let maze = new Maze(this.rows / 2 , this.colums /2);
        let mazeGenerate = maze.getMaze;
       for(let x = 0; x < this.rows; x++) {
           for(let y = 0; y < this.colums; y++) {
                if(mazeGenerate[x][y] === 'X') {
                    this.grid[x][y] = OBST;
                }
            }
       }
    }
}