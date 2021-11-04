// Game Of Life
// by Sébastien Gaudard ESGI - 4IW1
var GameOfLife = /** @class */ (function () {
    function GameOfLife(gridSize, element) {
        this.gridSize = 10;
        this.gridSize = gridSize;
        this.element = element;
    }
    GameOfLife.prototype.generateGrid = function () {
        var _this = this;
        var generateCoordinate = function (index) {
            var x = index % _this.gridSize;
            var y = Math.floor(index / _this.gridSize);
            return { y: y, x: x };
        };
        var generateCell = function (index) {
            var el = document.createElement('div');
            el.classList.add('game__cell');
            el.style.width = 100 / _this.gridSize + "%";
            el.style.height = 100 / _this.gridSize + "%";
            el.dataset.test = JSON.stringify(generateCoordinate(index));
            return el;
        };
        for (var i = 0; i < this.gridSize * this.gridSize; i++) {
            this.element.append(generateCell(i));
        }
    };
    return GameOfLife;
}());
var gol = new GameOfLife(10, document.getElementById('game'));
gol.generateGrid();
