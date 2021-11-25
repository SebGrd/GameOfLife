"use strict";
// Game Of Life
// by Sébastien Gaudard ESGI - 4IW1
exports.__esModule = true;
require("./utils/compareObjects");
var GameOfLife = /** @class */ (function () {
    function GameOfLife(gridSize, element) {
        this.gridSize = 10;
        this.cells = [];
        this.gridSize = gridSize;
        this.element = element;
    }
    GameOfLife.prototype.generateGrid = function () {
        var _this = this;
        var generateCoordinate = function (index) {
            var x = index % _this.gridSize;
            var y = Math.floor(index / _this.gridSize);
            return { x: x, y: y };
        };
        var generateCell = function (index) {
            var el = document.createElement('div');
            el.classList.add('game__cell');
            el.style.width = 100 / _this.gridSize + "%";
            el.style.height = 100 / _this.gridSize + "%";
            el.dataset.coordinates = JSON.stringify(generateCoordinate(index));
            var _a = generateCoordinate(index), x = _a.x, y = _a.y;
            el.innerText = x + " - " + y;
            return el;
        };
        for (var i = 0; i < this.gridSize * this.gridSize; i++) {
            var cell = generateCell(i);
            this.cells.push(cell);
            this.element.append(cell);
        }
    };
    GameOfLife.prototype.getNeighbours = function (coord) {
        // 3, 2 => 2,1 / 3,1 / 4,1 // 2,2 / 4, 2 // 2,3 / 3,3 / 4,4
        var x = coord.x, y = coord.y;
        return [
            { x: x - 1, y: y - 1 },
            { x: x, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y },
            { x: x + 1, y: y },
            { x: x - 1, y: y + 1 },
            { x: x, y: y + 1 },
            { x: x + 1, y: y + 1 },
        ];
    };
    GameOfLife.prototype.getCellEl = function (coords) {
        return this.cells.filter(function (cell) {
            var cellCoords = JSON.parse(cell.dataset.coordinates);
            return compareObjects(cellCoords, coords);
        });
    };
    GameOfLife.prototype.setAlive = function (coords) {
        var el = this.getCellEl(coords);
    };
    return GameOfLife;
}());
var gol = new GameOfLife(10, document.getElementById('game'));
gol.generateGrid();
console.log(gol.getCellEl({ x: 2, y: 3 }));
console.log(compareObjects({ x: 2, y: 3 }, { x: 2, y: 3 }));
