import {Point} from './Point';

export class GameObject
{
    position = null;

    id = 0;
    paralax_force = 0;
    paralax_scroll = 0;
    tag = '';

    constructor(x, y)
    {
        //position stored in Point
        this.position = new Point(x, y);
    }

    draw(canvas_context)
    {
        // ...
    }

    //executed each frame by engine
    render(canvas_context)
    {
        canvas_context.beginPath();
        this.draw(canvas_context);
        canvas_context.fill();
    }

    //action executed, when object is deleted from engine
    onDelete(event_name)
    {

    }
}