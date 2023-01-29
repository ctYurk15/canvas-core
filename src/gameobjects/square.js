import {Rectangle} from './Rectangle';

export class Square extends Rectangle
{
    tag = 'square';

    constructor(x, y, width, color, sprite)
    {
        super(x, y, width, width, color);
        this.sprite = sprite;
    }

    render(canvas_context)
    {
        this.sprite.draw(canvas_context, this.position.x, this.position.y, this.width, this.width);
    }

    select()
    {
        this.selected = true;
    }

    unselect()
    {
        this.selected = false;
    }
}