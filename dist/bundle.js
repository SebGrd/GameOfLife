/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/styles.scss?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_compareObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/compareObjects */ \"./src/utils/compareObjects.ts\");\nvar _a, _b;\r\n// Game Of Life\r\n// by Sébastien Gaudard ESGI - 4IW1\r\n__webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\r\n\r\nvar Action;\r\n(function (Action) {\r\n    Action[Action[\"Nothing\"] = 0] = \"Nothing\";\r\n    Action[Action[\"Born\"] = 1] = \"Born\";\r\n    Action[Action[\"Kill\"] = 2] = \"Kill\";\r\n})(Action || (Action = {}));\r\nvar GameOfLife = /** @class */ (function () {\r\n    function GameOfLife(gridSize, element) {\r\n        this.cells = [];\r\n        this._snapshot = [];\r\n        this.gridSize = gridSize;\r\n        this.element = element;\r\n        this.generateGrid();\r\n    }\r\n    Object.defineProperty(GameOfLife.prototype, \"snapshot\", {\r\n        get: function () {\r\n            return this._snapshot;\r\n        },\r\n        set: function (value) {\r\n            this._snapshot = value;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    GameOfLife.prototype.generateGrid = function () {\r\n        var _this = this;\r\n        var generateCoordinate = function (index) {\r\n            var x = index % _this.gridSize;\r\n            var y = Math.floor(index / _this.gridSize);\r\n            return { x: x, y: y };\r\n        };\r\n        var generateCell = function (index) {\r\n            var el = document.createElement('div');\r\n            el.classList.add('game__cell');\r\n            el.style.width = \"\".concat(100 / _this.gridSize, \"%\");\r\n            el.style.height = \"\".concat(100 / _this.gridSize, \"%\");\r\n            el.dataset.coordinates = JSON.stringify(generateCoordinate(index));\r\n            return el;\r\n        };\r\n        for (var i = 0; i < this.gridSize * this.gridSize; i++) {\r\n            var cell = generateCell(i);\r\n            this.cells.push(cell);\r\n            this.element.append(cell);\r\n        }\r\n    };\r\n    GameOfLife.prototype.getCellCoords = function (element) {\r\n        if (element.dataset.coordinates) {\r\n            return JSON.parse(element.dataset.coordinates);\r\n        }\r\n        return false;\r\n    };\r\n    GameOfLife.prototype.getCellFromCoords = function (coords) {\r\n        var _this = this;\r\n        return this.cells.filter(function (cell) {\r\n            return _utils_compareObjects__WEBPACK_IMPORTED_MODULE_0__.compareObjects(_this.getCellCoords(cell), coords);\r\n        })[0];\r\n    };\r\n    GameOfLife.prototype.getNeighboursCoords = function (coord) {\r\n        // 3, 2 => 2,1 / 3,1 / 4,1 // 2,2 / 4, 2 // 2,3 / 3,3 / 4,4\r\n        var x = coord.x, y = coord.y;\r\n        return [\r\n            { x: x - 1, y: y - 1 },\r\n            { x: x, y: y - 1 },\r\n            { x: x + 1, y: y - 1 },\r\n            { x: x - 1, y: y },\r\n            { x: x + 1, y: y },\r\n            { x: x - 1, y: y + 1 },\r\n            { x: x, y: y + 1 },\r\n            { x: x + 1, y: y + 1 },\r\n        ];\r\n    };\r\n    GameOfLife.prototype.setCellAlive = function (coords) {\r\n        var el = this.getCellFromCoords(coords);\r\n        el.classList.add('alive');\r\n    };\r\n    GameOfLife.prototype.setCellDead = function (coords) {\r\n        var el = this.getCellFromCoords(coords);\r\n        el.classList.remove('alive');\r\n    };\r\n    /*\r\n    @return boolean true = alive | false = dead\r\n     */\r\n    GameOfLife.prototype.getCellState = function (coords) {\r\n        var el = this.getCellFromCoords(coords);\r\n        if (el === null || el === void 0 ? void 0 : el.classList) {\r\n            return el.classList.contains('alive');\r\n        }\r\n        return false;\r\n    };\r\n    /*\r\n    @return number 0 = do nothing | 1 = new born | 2 = kill it\r\n     */\r\n    GameOfLife.prototype.cellFutureState = function (coords) {\r\n        var _this = this;\r\n        var neighbors = this.getNeighboursCoords(coords);\r\n        var nbNeighbors = 0;\r\n        neighbors.forEach(function (value) {\r\n            if (_this.getCellState(value)) {\r\n                nbNeighbors++;\r\n            }\r\n        });\r\n        if (nbNeighbors <= 1)\r\n            return 2; // dies by solitude\r\n        if (nbNeighbors >= 4)\r\n            return 2; // dies by overpopulation\r\n        if (nbNeighbors === 3)\r\n            return 1; // new born\r\n        return 0; // stay alive\r\n    };\r\n    GameOfLife.prototype.makeSnapshot = function () {\r\n        var _this = this;\r\n        this.snapshot = this.cells.map(function (cell) { return Object.create({\r\n            coords: _this.getCellCoords(cell),\r\n            alive: _this.getCellState(_this.getCellCoords(cell)),\r\n        }); });\r\n    };\r\n    GameOfLife.prototype.restoreSnapshot = function () {\r\n        var _this = this;\r\n        this.snapshot.forEach(function (_a) {\r\n            var coords = _a.coords, alive = _a.alive;\r\n            if (alive) {\r\n                console.log('test');\r\n                _this.setCellAlive(coords);\r\n            }\r\n            else {\r\n                _this.setCellDead(coords);\r\n            }\r\n        });\r\n    };\r\n    GameOfLife.prototype.previousFrame = function () {\r\n        if (this.snapshot)\r\n            this.restoreSnapshot();\r\n    };\r\n    GameOfLife.prototype.nextFrame = function () {\r\n        var _this = this;\r\n        var nextFrame = [];\r\n        this.cells.forEach(function (cell) {\r\n            var coords = _this.getCellCoords(cell);\r\n            switch (_this.cellFutureState(coords)) {\r\n                case Action.Born:\r\n                    nextFrame.push({ coords: coords, action: Action.Born });\r\n                    break;\r\n                case Action.Kill:\r\n                    nextFrame.push({ coords: coords, action: Action.Kill });\r\n                    break;\r\n            }\r\n        });\r\n        nextFrame.forEach(function (_a) {\r\n            var coords = _a.coords, action = _a.action;\r\n            switch (action) {\r\n                case Action.Born:\r\n                    _this.setCellAlive(coords);\r\n                    break;\r\n                case Action.Kill:\r\n                    _this.setCellDead(coords);\r\n            }\r\n        });\r\n        // this.makeSnapshot();\r\n    };\r\n    return GameOfLife;\r\n}());\r\nvar mainElement = document.getElementById('game');\r\nif (mainElement) {\r\n    var gol_1 = new GameOfLife(13, mainElement);\r\n    // Game event listener\r\n    mainElement === null || mainElement === void 0 ? void 0 : mainElement.addEventListener('click', function (event) {\r\n        var target = event.target;\r\n        // Cell clicked\r\n        if (target.classList.contains('game__cell')) {\r\n            var coords = gol_1.getCellCoords(target);\r\n            if (gol_1.getCellState(coords)) {\r\n                gol_1.setCellDead(coords);\r\n            }\r\n            else {\r\n                gol_1.setCellAlive(coords);\r\n            }\r\n        }\r\n    });\r\n    // Controls event listeners\r\n    (_a = document.getElementById('next-frame')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {\r\n        gol_1.nextFrame();\r\n    });\r\n    (_b = document.getElementById('previous-frame')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {\r\n        gol_1.previousFrame();\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/utils/compareObjects.ts":
/*!*************************************!*\
  !*** ./src/utils/compareObjects.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"compareObjects\": () => (/* binding */ compareObjects)\n/* harmony export */ });\nfunction compareObjects(object1, object2) {\r\n    var keys1 = Object.keys(object1);\r\n    var keys2 = Object.keys(object2);\r\n    var values1 = Object.values(object1);\r\n    var values2 = Object.values(object2);\r\n    var sameKeys = keys1.every((function (value, index) { return value === keys2[index]; }));\r\n    var sameValues = values1.every((function (value, index) { return value === values2[index]; }));\r\n    return sameKeys && sameValues;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/compareObjects.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;