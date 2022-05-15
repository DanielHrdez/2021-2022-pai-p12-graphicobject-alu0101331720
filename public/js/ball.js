/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Daniel Hernández de León
 * @description Ball mainfile
 */
import { MobileBall } from './mobile-ball.js';
import { BallController } from './ball-controller.js';
/**
 * Sets the canvas style.
 * @param {HTMLCanvasElement} canvas - The canvas to set the style.
 */
function setCanvasStyle(canvas) {
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.boxShadow = '0 0 10px black';
}
const main = () => {
    const canvas = document.createElement('canvas');
    setCanvasStyle(canvas);
    document.body.appendChild(canvas);
    const ball = new MobileBall(50, 50, canvas);
    new BallController(ball);
    ball.draw();
};
main();
