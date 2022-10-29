/*import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Canvas', '-', 'core'], ' ');

  return element;
}

document.body.appendChild(component());*/

import {Engine} from './Engine';

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//const engine = new Engine(canvas, 'blue');
console.log(new Engine(canvas, 'blue'));
