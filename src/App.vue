<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <button type="button" id="btn-animation" onclick="updateData()">Click Me!</button>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { GameModel } from './game-library/GameModel'
import * as d3 from 'd3'

const EMPTY = 0;
const OBST = 1;
const ROBOT = 2;
const TARGET = 3;

export default {
  name: 'app',
  data () {
    var game = new GameModel(30, 30, true);
    return {
      msg: "welcome",
      data: game.getGrid
    }
  },
  mounted() {
    this.renderMaze();
  },
  methods : {
    renderMaze() {
      
      let w = 1000, h = 1000;
      let rw = 20, rh = 20;
     
     let svg = d3.select('body')
                  .append('svg')
                  .attr('width', w)
                  .attr('height', h);
     let gra = svg.selectAll('g')
                  .data(this.data)
                  .enter()
                  .append('g')
                  .attr('transform', function(d, i) {
                    return 'translate(0, ' + 23 * i + ')';
                  });
        gra.selectAll('rect')
              .data(function(d) { return d; })
              .enter()
              .append('rect')
                .attr('x', function(d, i) { return 22 * i; })
                .attr('width', rw)
                .attr('height', rh)
                .attr("fill", function(d) {
                  // return d === 'X' ? "black" : "white"
                  switch(d) {
                    case OBST: 
                      return "black";
                    case ROBOT:
                      return "green";
                    case TARGET:
                      return "Red";
                    default:
                      return "white"
                  }
                })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
