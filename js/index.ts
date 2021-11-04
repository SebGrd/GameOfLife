// Game Of Life
// by Sébastien Gaudard ESGI - 4IW1

type Coordinates = { y: number, x: number }

class GameOfLife {
    gridSize: number = 10;
    element: HTMLElement;

    constructor(gridSize: number, element: HTMLElement) {
        this.gridSize = gridSize;
        this.element = element
    }

    generateGrid() {
        const generateCoordinate = (index): Coordinates => {
            const x = index % this.gridSize;
            const y = Math.floor(index / this.gridSize);
            return {y, x}
        }
        const generateCell = (index) => {
            const el = document.createElement('div')
            el.classList.add('game__cell')
            el.style.width = `${100 / this.gridSize}%`;
            el.style.height = `${100 / this.gridSize}%`;
            el.dataset.test = JSON.stringify(generateCoordinate(index))
            return el;
        }
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            this.element.append(generateCell(i))
        }
    }

}

const gol = new GameOfLife(10, document.getElementById('game'))

gol.generateGrid();

