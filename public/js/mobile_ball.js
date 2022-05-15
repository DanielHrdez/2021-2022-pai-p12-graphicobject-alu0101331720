/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Daniel Hernández de León
 * @description MobileBall class
 */
import { Direction } from './direction.js';
/**
 * @class MobileBall
 * @classdesc Class that represents a mobile ball.
 */
export class MobileBall {
    /**
     * Constructor of the class.
     * @param {number} xPosition - The initial x position of the ball in %.
     * @param {number} yPosition - The initial y position of the ball in %.
     * @param {HTMLCanvasElement} canvas
     * - The canvas where the ball will be drawn.
     */
    constructor(xPosition, yPosition, canvas) {
        this.radius = 10;
        this.circleRange = [0, 2 * Math.PI];
        this.color = 'red';
        this.xPosition = xPosition * canvas.width;
        this.yPosition = yPosition * canvas.height;
        this.increment = 0.1;
        this.context = canvas.getContext('2d');
        if (!this.context) {
            throw new Error('Canvas context is not defined');
        }
    }
    /**
     * Draws the circle in the x, y position
     */
    draw() {
        this.context.beginPath();
        this.context.arc(this.xPosition, this.yPosition, this.radius, this.circleRange[0], this.circleRange[1]);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    /**
     * Move the ball with the given direction.
     * @param {Direction} direction - The direction of the movement.
     */
    move(direction) {
        switch (direction) {
            case Direction.UP:
                this.yPosition -= this.increment;
                break;
            case Direction.DOWN:
                this.yPosition += this.increment;
                break;
            case Direction.LEFT:
                this.xPosition -= this.increment;
                break;
            case Direction.RIGHT:
                this.xPosition += this.increment;
                break;
        }
    }
}
