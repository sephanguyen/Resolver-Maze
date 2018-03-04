import { Vertex } from './vetex'

class AlgorithmResolver{

    constructor(algorithm, vertexList) {
        this.algorithm = algorithm;
        this.vertexList = vertexList;
    }

    resolver() {
        this.algorithm(this.vertexList);
    }
}

function runDfs(vertexList){
    for(let vertex of vertexList) {
        if(!vertex.isVisited()) {
            dfs(vertex)
        }
    }
}
function dfs(vertex) {
    for(let v of vertex.getNeighbourList()) {
        if(!v.isVisited()) {
            v.setVisited(true);
            v.setPredecessor(vertex);
            dfs(v);
        }
    }
}

export { AlgorithmResolver, runDfs };
