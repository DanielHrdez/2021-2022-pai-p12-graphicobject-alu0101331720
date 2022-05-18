/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Daniel Hernández de León
 * @description Controller class
 */
import { Direction } from '../src/direction.js';
/**
 * @class Controller
 */
export class BallController {
    /**
     * Constructor of the class.
     * @param {MobileBall} ball - The ball to control.
     */
    constructor(ball) {
        this.params = {
            buttonUp: document.createElement('button'),
            buttonDown: document.createElement('button'),
            buttonLeft: document.createElement('button'),
            buttonRight: document.createElement('button'),
            inputIncrement: document.createElement('input'),
        };
        this.ball = ball;
        this.setParams();
    }
    /**
     * Initializes the params of the controller.
     */
    setParams() {
        this.setParamsStyle();
        const params = document.createElement('div');
        params.style.position = 'absolute';
        params.style.top = '50%';
        params.style.right = '0%';
        params.style.transform = 'translate(-50%, -50%)';
        params.style.display = 'grid';
        params.style.minWidth = '10%';
        params.style.minHeight = '25%';
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
        this.params.inputIncrement.value = '25';
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
        switch (direction) {
            case 'Up':
                this.params.buttonUp.innerText = direction;
                this.params.buttonUp.onclick = () => {
                    this.ball.move(Direction.UP);
                };
                break;
            case 'Down':
                this.params.buttonDown.innerText = direction;
                this.params.buttonDown.onclick = () => {
                    this.ball.move(Direction.DOWN);
                };
                break;
            case 'Left':
                this.params.buttonLeft.innerText = direction;
                this.params.buttonLeft.onclick = () => {
                    this.ball.move(Direction.LEFT);
                };
                break;
            case 'Right':
                this.params.buttonRight.innerText = direction;
                this.params.buttonRight.onclick = () => {
                    this.ball.move(Direction.RIGHT);
                };
                break;
            default:
                throw new Error('Invalid direction');
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
        this.setIncrementStyle();
    }
}
