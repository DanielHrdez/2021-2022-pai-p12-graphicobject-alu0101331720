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
const main = () => {
    /**
     * Sets the canvas style.
     * @param {HTMLCanvasElement} canvas - The canvas to set the style.
     */
    const setCanvasStyle = (canvas) => {
        canvas.width = window.innerWidth * 0.75;
        canvas.height = window.innerHeight * 0.75;
        canvas.style.position = 'absolute';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.boxShadow = '0 0 10px black';
    };
    const canvas = document.createElement('canvas');
    setCanvasStyle(canvas);
    document.body.appendChild(canvas);
    const ball1 = new MobileBall(60, 50, canvas, 'red', './img/mask.jpg');
    const ball2 = new MobileBall(40, 50, canvas, 'blue', './img/mask.jpg');
    new BallController(ball1);
    new BallController(ball2, 'left');
    const balls = [ball1, ball2];
    const ballsAnimations = () => {
        balls.forEach((ball) => ball.draw());
        requestAnimationFrame(ballsAnimations);
    };
    requestAnimationFrame(ballsAnimations);
    window.addEventListener('resize', () => {
        setCanvasStyle(canvas);
        ball1.draw();
        ball2.draw();
    });
};
main();
