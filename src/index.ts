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
    private _snapshot: Array<{ coords: Coordinates; alive: boolean; }> = [];

    constructor(gridSize: number, element: HTMLElement) {
        this.gridSize = gridSize;
        this.element = element;
        this.generateGrid();
    }

    get snapshot(): Array<{ coords: Coordinates; alive: boolean }> {
        return this._snapshot;
    }

    set snapshot(value: Array<{ coords: Coordinates; alive: boolean }>) {
        this._snapshot = value;
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

    getCellCoords(element: HTMLElement) {
        if (element.dataset.coordinates) {
            return JSON.parse(element.dataset.coordinates);
        }
        return false;
    }

    getCellFromCoords(coords: Coordinates): HTMLElement {
        return this.cells.filter((cell) =>
            util.compareObjects(this.getCellCoords(cell), coords)
        )[0];
    }

    getNeighboursCoords(coord: Coordinates): Array<Coordinates> {
        // 3, 2 => 2,1 / 3,1 / 4,1 // 2,2 / 4, 2 // 2,3 / 3,3 / 4,4
        const {x, y} = coord;
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

    setCellAlive(coords: Coordinates): void {
        const el: HTMLElement = this.getCellFromCoords(coords);
        el.classList.add('alive')
    }

    setCellDead(coords: Coordinates): void {
        const el: HTMLElement = this.getCellFromCoords(coords);
        el.classList.remove('alive')
    }

    /*
    @return boolean true = alive | false = dead
     */
    getCellState(coords: Coordinates): boolean {
        const el = this.getCellFromCoords(coords);
        if (el?.classList) {
            return el.classList.contains('alive');
        }
        return false;
    }

    /*
    @return number 0 = do nothing | 1 = new born | 2 = kill it
     */
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

    makeSnapshot(): void {
        this.snapshot = this.cells.map((cell) => Object.create({
            coords: this.getCellCoords(cell),
            alive: this.getCellState(this.getCellCoords(cell)),
        }))
    }

    restoreSnapshot(): void {
        this.snapshot.forEach(({coords, alive}) => {
            if (alive) {
                console.log('test')
                this.setCellAlive(coords);
            } else {
                this.setCellDead(coords);
            }
        })
    }

    previousFrame(): void {
        if (this.snapshot) this.restoreSnapshot();
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
        // this.makeSnapshot();
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
    document.getElementById('previous-frame')?.addEventListener('click', () => {
        gol.previousFrame();
    })
}


