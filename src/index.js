import {Engine} from './components/Engine';
import {Initializer} from './components/Initializer';
import {getRandomInt, getRandomColor, createImage} from './functions';
import {Rectangle} from './gameobjects/Rectangle';
import {} from './game-config';
import { Sprite } from './components/Sprite';

let animation_id = null;

const fps_counter = document.querySelector("#fpsSpan");

const initializer = new Initializer();
const canvas = initializer.initializeCanvas();

const engine = new Engine(canvas);
const rect1 = new Rectangle(getRandomInt(100, 150), getRandomInt(100, 150), getRandomInt(50, 150), getRandomInt(50, 150), getRandomColor());
const rect1_center = rect1.centerCoordinates();
const sprite1 = new Sprite(createImage('./textures/alien.png'));

engine.addObject(rect1);
engine.start();

engine.addFrameAction(function(){
    sprite1.draw(engine.context, rect1_center.x - rect1.width/4, rect1_center.y - rect1.width/4, rect1.width/2, rect1.width/2)
});

function animate()
{
    animation_id = requestAnimationFrame(animate);
    engine.render();
    if(engine.last_deltaTime != 0) fps_counter.innerHTML = 'FPS: '+1/engine.last_deltaTime;
}

animate();