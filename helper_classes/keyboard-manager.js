export class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindBtnPressEvents();
        this.bindKeyPressEvents();
    }

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
