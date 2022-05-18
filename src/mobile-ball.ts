/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Daniel Hernández de León
 * @description MobileBall class
 */

import {Direction} from './direction.js';

/**
 * @class MobileBall
 * @classdesc Class that represents a mobile ball.
 */
export class MobileBall {
  private xPosition: number = 0;
  private yPosition: number = 0;
  private increment: number = 25;
  private radius: number = 20;
  private context: CanvasRenderingContext2D;
  private circleRange: [number, number] = [0, 2 * Math.PI];
  private color: string = 'red';
  private previousX: number;
  private previousY: number;
  private image: HTMLImageElement;

  /**
   * Constructor of the class.
   * @param {number} xPosition - The initial x position of the ball in %.
   * @param {number} yPosition - The initial y position of the ball in %.
   * @param {HTMLCanvasElement} canvas
   * @param {string} color - the color of the ball
   * - The canvas where the ball will be drawn.
   * @param  {string} image - the image
   */
  constructor(
      xPosition: number,
      yPosition: number,
      canvas: HTMLCanvasElement,
      color: string = 'red',
      image: string = '',
  ) {
    this.xPosition = xPosition! * canvas.width / 100 || canvas.width / 2;
    this.yPosition = yPosition! * canvas.height / 100 || canvas.width / 2;
    this.previousX = -1;
    this.previousY = -1;
    this.context = canvas.getContext('2d')!;
    if (!this.context) {
      throw new Error('Canvas context is not defined');
    }
    this.color = color;
    this.image = new Image();
    this.image.src = image;
    this.image.style.width = this.radius + 'px';
    this.image.style.height = 'auto';
    // this.image.sizes = '10px, 10px';
    // console.log(this.image);
  }

  /**
   * Sets the x position of the ball.
   * @param {number} xPosition - The x position of the ball in px.
   */
  public setXPosition(xPosition: number): void {
    this.xPosition = xPosition;
  }

  /**
   * Sets the y position of the ball.
   * @param {number} yPosition - The y position of the ball in px.
   */
  public setYPosition(yPosition: number): void {
    this.yPosition = yPosition;
  }

  /**
   * Sets the increment of the ball.
   * @param {number} increment - The increment of the movement.
   */
  public setIncrement(increment: number): void {
    this.increment = increment;
  }

  /**
   * Sets the context of the ball.
   * @param {CanvasRenderingContext2D} context - The canvas context.
   */
  public setContext(context: CanvasRenderingContext2D): void {
    this.context = context;
  }

  /**
   * Draws the circle in the x, y position
   */
  public draw(): void {
    if (!this.image.src) {
      this.context.clearRect(
          this.previousX - this.radius - 1,
          this.previousY - this.radius - 1,
          this.radius * 2 + 2,
          this.radius * 2 + 2,
      );
      if (this.context) {
        this.context.beginPath();
        this.context.arc(
            this.xPosition,
            this.yPosition,
            this.radius,
            this.circleRange[0],
            this.circleRange[1],
        );
        this.context.fillStyle = this.color;
        this.context.fill();
      }
    } else {
      this.context.drawImage(this.image, this.xPosition, this.yPosition);
    }
  }

  /**
   * Move the ball with the given direction.
   * @param {Direction} direction - The direction of the movement.
   */
  public move(direction: Direction): void {
    this.previousX = this.xPosition;
    this.previousY = this.yPosition;
    switch (direction) {
      case Direction.UP:
        this.yPosition -= this.increment;
        if (this.yPosition - this.radius < 0) {
          this.yPosition = this.radius;
        }
        break;
      case Direction.DOWN:
        this.yPosition += this.increment;
        if (this.yPosition + this.radius > this.context.canvas.height) {
          this.yPosition = this.context.canvas.height - this.radius;
        }
        break;
      case Direction.LEFT:
        this.xPosition -= this.increment;
        if (this.xPosition - this.radius < 0) {
          this.xPosition = this.radius;
        }
        break;
      case Direction.RIGHT:
        this.xPosition += this.increment;
        if (this.xPosition + this.radius > this.context.canvas.width) {
          this.xPosition = this.context.canvas.width - this.radius;
        }
        break;
      case Direction.UPRIGHT:
        this.yPosition -= this.increment;
        if (this.yPosition - this.radius < 0) {
          this.yPosition = this.radius;
        }
        this.xPosition += this.increment;
        if (this.xPosition + this.radius > this.context.canvas.width) {
          this.xPosition = this.context.canvas.width - this.radius;
        }
        break;
      case Direction.UPLEFT:
        this.yPosition -= this.increment;
        if (this.yPosition - this.radius < 0) {
          this.yPosition = this.radius;
        }
        this.xPosition -= this.increment;
        if (this.xPosition - this.radius < 0) {
          this.xPosition = this.radius;
        }
        break;
      case Direction.DOWNRIGHT:
        this.yPosition += this.increment;
        if (this.yPosition + this.radius > this.context.canvas.height) {
          this.yPosition = this.context.canvas.height - this.radius;
        }
        this.xPosition += this.increment;
        if (this.xPosition + this.radius > this.context.canvas.width) {
          this.xPosition = this.context.canvas.width - this.radius;
        }
        break;
      case Direction.DOWNLEFT:
        this.yPosition += this.increment;
        if (this.yPosition + this.radius > this.context.canvas.height) {
          this.yPosition = this.context.canvas.height - this.radius;
        }
        this.xPosition -= this.increment;
        if (this.xPosition - this.radius < 0) {
          this.xPosition = this.radius;
        }
        break;
      default: throw new Error('Invalid direction');
    }
    this.draw();
  }
}
