import {Engine} from './components/Engine';
import {Initializer} from './components/Initializer';
import {getRandomInt, getRandomColor} from './functions';
import {Rectangle} from './gameobjects/Rectangle';
import {} from './game-config';

let animation_id = null;

const initializer = new Initializer();
const canvas = initializer.initializeCanvas();

const engine = new Engine(canvas);
const rect1 = new Rectangle(getRandomInt(100, 150), getRandomInt(100, 150), getRandomInt(50, 150), getRandomInt(50, 150), getRandomColor());

engine.addObject(rect1);
engine.start();

function animate()
{
    animation_id = requestAnimationFrame(animate);
    engine.render();
}

animate();