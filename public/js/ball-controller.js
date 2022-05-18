/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Daniel Hernández de León
 * @description Controller class
 */
import { Direction } from './direction.js';
/**
 * @class Controller
 */
export class BallController {
    /**
     * Constructor of the class.
     * @param {MobileBall} ball - The ball to control.
     * @param {string} offset - if is going to be in the right or the left
     */
    constructor(ball, offset = 'right') {
        this.offset = 'right';
        this.change = false;
        this.params = {
            buttonUp: document.createElement('button'),
            buttonDown: document.createElement('button'),
            buttonLeft: document.createElement('button'),
            buttonRight: document.createElement('button'),
            buttonUpLeft: document.createElement('button'),
            buttonUpRight: document.createElement('button'),
            buttonDownLeft: document.createElement('button'),
            buttonDownRight: document.createElement('button'),
            inputIncrement: document.createElement('input'),
        };
        this.ball = ball;
        this.offset = offset;
        this.setParams();
    }
    /**
     * Initializes the params of the controller.
     */
    setParams() {
        this.setParamsStyle();
        const params = document.createElement('div');
        params.style.position = 'absolute';
        params.style.bottom = '-20%';
        params.style.minWidth = '5%';
        params.style.minHeight = '25%';
        if (this.offset === 'right')
            params.style.right = '5%';
        else
            params.style.left = '10%';
        params.style.transform = 'translate(-50%, -50%)';
        params.style.display = 'grid';
        for (const param of Object.values(this.params)) {
            params.appendChild(param);
        }
        document.body.appendChild(params);
    }
    /**
     * Initializes the increment of the controller.
     */
    setIncrementStyle() {
        this.params.inputIncrement.type = 'number';
        this.params.inputIncrement.style.position = 'relative';
        this.params.inputIncrement.style.top = '-500%';
        this.params.inputIncrement.value = '1';
        this.params.inputIncrement.min = '0';
        this.params.inputIncrement.max = '1000';
        this.params.inputIncrement.step = '10';
        this.ball.setIncrement(Number(this.params.inputIncrement.value));
        this.params.inputIncrement.onchange = () => {
            this.ball.setIncrement(Number(this.params.inputIncrement.value));
        };
    }
    /**
     * Initializes the Direction of the controller.
     * @param {string} direction - The direction to set the param.
     */
    setDirectionStyle(direction) {
        const buttonPosition = '-200%';
        switch (direction) {
            case 'Up':
                this.params.buttonUp.innerText = direction;
                this.params.buttonUp.style.position = 'relative';
                this.params.buttonUp.style.top = '200%';
                this.params.buttonUp.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.UP);
                    });
                };
                break;
            case 'Down':
                this.params.buttonDown.innerText = direction;
                this.params.buttonDown.style.position = 'relative';
                this.params.buttonDown.style.bottom = '-300%';
                this.params.buttonDown.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.DOWN);
                    });
                };
                break;
            case 'Left':
                this.params.buttonLeft.innerText = direction;
                this.params.buttonLeft.style.position = 'relative';
                this.params.buttonLeft.style.bottom = '-100%';
                this.params.buttonLeft.style.left = '-100%';
                this.params.buttonLeft.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.LEFT);
                    });
                };
                break;
            case 'Right':
                this.params.buttonRight.innerText = direction;
                this.params.buttonRight.style.position = 'relative';
                this.params.buttonRight.style.right = '-100%';
                this.params.buttonRight.style.top = '0%';
                this.params.buttonRight.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.RIGHT);
                    });
                };
                break;
            case 'UpRight':
                this.params.buttonUpRight.innerText = direction;
                this.params.buttonUpRight.style.position = 'relative';
                this.params.buttonUpRight.style.right = '-100%';
                this.params.buttonUpRight.style.top = '-300%';
                this.params.buttonUpRight.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.UPRIGHT);
                    });
                };
                break;
            case 'UpLeft':
                this.params.buttonUpLeft.innerText = direction;
                this.params.buttonUpLeft.style.position = 'relative';
                this.params.buttonUpLeft.style.bottom = '200%';
                this.params.buttonUpLeft.style.left = '-100%';
                this.params.buttonUpLeft.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.UPLEFT);
                    });
                };
                break;
            case 'DownRight':
                this.params.buttonDownRight.innerText = direction;
                this.params.buttonDownRight.style.position = 'relative';
                this.params.buttonDownRight.style.left = '100%';
                this.params.buttonDownRight.style.bottom = '300%';
                this.params.buttonDownRight.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.DOWNRIGHT);
                    });
                };
                break;
            case 'DownLeft':
                this.params.buttonDownLeft.innerText = direction;
                this.params.buttonDownLeft.style.position = 'relative';
                this.params.buttonDownLeft.style.right = '100%';
                this.params.buttonDownLeft.style.top = buttonPosition;
                this.params.buttonDownLeft.onclick = () => {
                    this.change = true;
                    requestAnimationFrame(() => {
                        this.change = false;
                        this.moveAnimation(Direction.DOWNLEFT);
                    });
                };
                break;
            default:
                throw new Error('Invalid direction');
        }
    }
    /**
     * Move the ball in loop
     * @param {Direction} direction direction
     */
    moveAnimation(direction) {
        this.ball.move(direction);
        if (!this.change) {
            requestAnimationFrame(() => this.moveAnimation(direction));
        }
    }
    /**
     * Initializes the params of the controller.
     */
    setParamsStyle() {
        this.setDirectionStyle('Up');
        this.setDirectionStyle('Down');
        this.setDirectionStyle('Left');
        this.setDirectionStyle('Right');
        this.setDirectionStyle('UpRight');
        this.setDirectionStyle('UpLeft');
        this.setDirectionStyle('DownRight');
        this.setDirectionStyle('DownLeft');
        this.setIncrementStyle();
    }
}
