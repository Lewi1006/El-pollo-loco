/**
 * Handles all player input controls.
 *
 * Keyboard stores the current state of keyboard and mobile button inputs.
 * The game checks these values to control movement, jumping and throwing.
 *
 * Supports:
 * - Keyboard controls (arrow keys, space and D key)
 * - Mobile touch controls
 *
 * @class Keyboard
 */
export class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Creates a new Keyboard controller.
     *
     * Registers keyboard events and mobile button events so the game can react
     * to player input.
     *
     * @constructor
     */
    constructor() {
        this.bindBtnPressEvents();
        this.bindKeyPressEvents();
    }

    /**
     * Registers keyboard input events.
     *
     * Updates the corresponding control properties when keys are pressed or
     * released. These values are checked by the character and world classes
     * to control gameplay actions.
     *
     * @returns {void}
     */
    bindKeyPressEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.code == "ArrowLeft") {
                this.LEFT = true;
            }

            if (event.code == "ArrowRight") {
                this.RIGHT = true;
            }

            if (event.code == "ArrowUp") {
                this.UP = true;
            }

            if (event.code == "ArrowDown") {
                this.DOWN = true;
            }

            if (event.code == "Space") {
                this.SPACE = true;
            }

            if (event.code == "KeyD") {
                this.D = true;
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.code == "ArrowLeft") {
                this.LEFT = false;
            }

            if (event.code == "ArrowRight") {
                this.RIGHT = false;
            }

            if (event.code == "ArrowUp") {
                this.UP = false;
            }

            if (event.code == "ArrowDown") {
                this.DOWN = false;
            }

            if (event.code == "Space") {
                this.SPACE = false;
            }

            if (event.code == "KeyD") {
                this.D = false;
            }
        });
    }

    /**
     * Registers touch events for mobile controls.
     *
     * Updates the same control properties as keyboard input, allowing the game
     * to be played on touch devices.
     *
     * @returns {void}
     */
    bindBtnPressEvents() {
        document
            .getElementById(`btn-left`)
            .addEventListener(`touchstart`, (e) => {
                e.preventDefault();
                this.LEFT = true;
            });

        document
            .getElementById(`btn-left`)
            .addEventListener(`touchend`, (e) => {
                e.preventDefault();
                this.LEFT = false;
            });

        document
            .getElementById("btn-right")
            .addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });

        document
            .getElementById("btn-right")
            .addEventListener("touchend", (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });

        document
            .getElementById("btn-jump")
            .addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.SPACE = true;
            });

        document
            .getElementById("btn-jump")
            .addEventListener("touchend", (e) => {
                e.preventDefault();
                this.SPACE = false;
            });

        document
            .getElementById("btn-throw")
            .addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.D = true;
            });

        document
            .getElementById("btn-throw")
            .addEventListener("touchend", (e) => {
                e.preventDefault();
                this.D = false;
            });
    }
}
