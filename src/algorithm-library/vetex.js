
export class Vertex {

    constructor(name) {
        this.name = name;
        this.neighbourList = [];
        this.visited = false;
        this.predecessor;
    }

    addNeighbour(vertex) {
        this.neighbourList.push(vertex);
    }

    get getPredecessor() {
        return this.predecessor;
    }

    set setPredecessor(vertex) {
        this.predecessor = vertex;
    }

    get getName() {
        return this.name;
    }

    get isVisited() {
        return this.visited;
    }
    set setVisited(visited) {
        this.visited = visited;
    }

    get getNeighbourList() {
        return this.neighbourList;
    }
    
}