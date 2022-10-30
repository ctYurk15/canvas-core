import {Engine} from './Engine';
import {getRandomInt} from './functions';
import {Rectangle} from './gameobjects/Rectangle';
import {} from './game-config';

let animation_id = null;

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas);
const rect1 = new Rectangle(getRandomInt(100, 150), getRandomInt(100, 150), getRandomInt(50, 150), getRandomInt(50, 150), 'blue');

engine.addObject(rect1);
engine.start();

function animate()
{
    animation_id = requestAnimationFrame(animate);
    engine.render();
}

animate();