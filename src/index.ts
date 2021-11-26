// Game Of Life
// by Sébastien Gaudard ESGI - 4IW1
require('./styles.scss')

import * as util from './utils/compareObjects';

type Coordinates = { y: number, x: number }

enum Action {
    Nothing = 0,
    Born = 1,
    Kill = 2,
}

class GameOfLife {
    private readonly gridSize: number;
    private cells: Array<HTMLElement> = [];
    private readonly element: HTMLElement;

    constructor(gridSize: number, element: HTMLElement) {
        this.gridSize = gridSize;
        this.element = element;
        this.generateGrid();
    }

    private generateGrid(): void {
        const generateCoordinate = (index: number): Coordinates => {
            const x = index % this.gridSize;
            const y = Math.floor(index / this.gridSize);
            return {x, y};
        }
        const generateCell = (index: number): HTMLElement => {
            const el = <HTMLElement>document.createElement('div')
            el.classList.add('game__cell')
            el.style.width = `${100 / this.gridSize}%`;
            el.style.height = `${100 / this.gridSize}%`;
            el.dataset.coordinates = JSON.stringify(generateCoordinate(index))
            return el;
        }
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = generateCell(i);
            this.cells.push(cell);
            this.element.append(cell)
        }
    }

    // Returns Coordinates from HTMLElement
    getCellCoords(element: HTMLElement): Coordinates {
        if (element.dataset.coordinates) {
            return JSON.parse(element.dataset.coordinates);
        }
        return {x: -1, y: -1};
    }

    // Returns HTMLElement from Coordinates
    getCellFromCoords(coords: Coordinates): HTMLElement {
        return this.cells.filter((cell) =>
            util.compareObjects(this.getCellCoords(cell), coords)
        )[0];
    }

    getNeighboursCoords(coords: Coordinates): Array<Coordinates> {
        const {x, y} = coords;
        return [
            {x: x - 1, y: y - 1},
            {x: x, y: y - 1},
            {x: x + 1, y: y - 1},
            {x: x - 1, y: y},
            {x: x + 1, y: y},
            {x: x - 1, y: y + 1},
            {x: x, y: y + 1},
            {x: x + 1, y: y + 1},
        ];
    }

    // Alive cells are common cells but with the "alive" class
    setCellAlive(coords: Coordinates): void {
        const el: HTMLElement = this.getCellFromCoords(coords);
        el.classList.add('alive')
    }

    // Dead cells are common cells with no special classes or attribute
    setCellDead(coords: Coordinates): void {
        const el: HTMLElement = this.getCellFromCoords(coords);
        el.classList.remove('alive')
    }

    // Returns true if the cell is alive
    getCellState(coords: Coordinates): boolean {
        const el = this.getCellFromCoords(coords);
        if (el?.classList) {
            return el.classList.contains('alive');
        }
        return false;
    }

    // Predict if the cell will be dead or alive depending on its neighbors
    cellFutureState(coords: Coordinates): Action {
        const neighbors = this.getNeighboursCoords(coords);
        let nbNeighbors = 0;
        neighbors.forEach(value => {
            if (this.getCellState(value)) {
                nbNeighbors++;
            }
        })
        if (nbNeighbors <= 1) return 2; // dies by solitude
        if (nbNeighbors >= 4) return 2; // dies by overpopulation
        if (nbNeighbors === 3) return 1; // new born
        return 0; // stay alive
    }

    nextFrame(): void {
        const nextFrame: Array<{coords: Coordinates, action: Action}> = [];
        this.cells.forEach((cell) => {
            const coords = this.getCellCoords(cell);
            switch (this.cellFutureState(coords)) {
                case Action.Born:
                    nextFrame.push({coords, action: Action.Born})
                    break;
                case Action.Kill:
                    nextFrame.push({coords, action: Action.Kill})
                    break;
            }
        })
        nextFrame.forEach(({coords, action}) => {
            switch (action) {
                case Action.Born:
                    this.setCellAlive(coords);
                    break;
                case Action.Kill:
                    this.setCellDead(coords);
            }
        })
    }
}

const mainElement = document.getElementById('game');
if (mainElement) {
    const gol = new GameOfLife(13, mainElement)
    // Game event listener
    mainElement?.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        // Cell clicked
        if (target.classList.contains('game__cell')) {
            const coords = gol.getCellCoords(target);
            if (gol.getCellState(coords)) {
                gol.setCellDead(coords)
            } else {
                gol.setCellAlive(coords);
            }
        }
    })

    // Controls event listeners
    document.getElementById('next-frame')?.addEventListener('click', () => {
        gol.nextFrame();
    })
}


