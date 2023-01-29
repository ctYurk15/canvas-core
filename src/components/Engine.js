export class Engine
{
    game_objects = [];
    keys = {};
    button_actions = [];
    release_button_actions = [];
    frame_actions = [];

    is_working = false;
    paused = false;
    next_id = 1;

    frames_count = 0;
    frames_calculator_interval = null;
    last_deltaTime = 0;

    //canvas - DOM <canvas>
    //background - color(string) or Sprite
    constructor(canvas, background = null)
    {
        this.canvas = canvas;
        this.background = background == null ? 'aqua' : background;
        this.context = canvas.getContext('2d');

        this.registerEvents();

        //Time.deltaTime calculation. Means how much time it takes to render one frame
        const self = this;
        this.frames_calculator_interval = setInterval(function(){
            self.last_deltaTime = 1 / self.frames_count;
            self.frames_count = 0;
        }, 1000);
    }

    //register UI events
    registerEvents()
    {
        this.checkButtonsPress();
    }

    start()
    {
        this.is_working = true;
        this.registerEvents();
    }

    stop()
    {
        this.is_working = false;
    }

    //for game-pause. PauseElement should be DOM-object
    togglePause(pause_element)
    {
        this.paused = !this.paused;
        if(this.paused) pause_element.classList.remove('hidden');
        else pause_element.classList.add('hidden');
    }

    //force pause to stop. PauseElement should be DOM-object
    stopPause(pause_element)
    {
        this.paused = false;
        pause_element.classList.add('hidden');
    }

    //trigger press & release events for Keyboard buttons
    addButtonPressEvent(button, action)
    {
        this.button_actions.push({code: button, action: action});
    }
    addButtonReleaseEvent(button, action)
    {
        this.release_button_actions.push({code: button, action: action});
    }

    //add action, which should be executed each frame
    addFrameAction(action)
    {
        this.frame_actions.push(action);
    }

    //executed each frame
    render()
    {
        if(this.is_working && !this.paused)
        {
            //clear canvas
            this.clear();

            //get canvas-context
            const context = this.context;

            //render game-objects
            this.game_objects.forEach(function(game_object){
                game_object.render(context);
            });

            //execute all frame-actions
            this.frame_actions.forEach(function(frame_action){
                frame_action();
            });

            //for last_deltaTime
            this.frames_count++;
        }
    }

    //clear canvas to draw again
    clear()
    {
        switch(this.background.constructor.name)
        {
            case 'String':
                this.context.fillStyle = this.background;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                break;
            case 'Sprite':
                this.background.draw(this.context, 0, 0, this.canvas.width, this.canvas.height);
                break;
        }
    }

    //add object to engine 
    //game_object - GameObject
    addObject(game_object)
    {
        game_object.id = this.next_id;
        this.next_id++;
        this.game_objects.push(game_object);
        return game_object.id;
    }

    //delete object from engine by its id;
    //object_id - id
    deleteObject(object_id)
    {
        this.game_objects = this.game_objects.filter(function(game_object){
            if(game_object.id == object_id) 
            {
                //fire delete event
                game_object.onDelete('singleDelete');
            }

            return game_object.id != object_id;
        });
    }

    //returns object by its id
    //object_id - id
    getObjectById(object_id)
    {
        let result = null;

        for(let object of this.game_objects)
        {
            if(object.id == object_id)
            {
                result = object;
                break;
            }
        }

        return result;
    }

    //get all objects with specific tag
    //tag - string
    getObjectsByTag(tag = '')
    {
        let result = [];

        for(let object of this.game_objects)
        {
            if(object.tag == tag)
            {
                result.push(object);
            }
        }

        return result;
    }

    //delete all objects
    clearObjects()
    {
        this.game_objects.forEach(function(object){
            //fire delete event
            object.onDelete('clearScene');
        });

        this.game_objects = [];
        this.clear();
    }

    //remove all objects with specific tag
    //tag - string
    clearObjectsByTag(tag)
    {
        this.game_objects = this.game_objects.filter(function(game_object){
            if(game_object.tag == tag) game_object.onDelete('singleDelete');
            return game_object.tag != tag;
        });
    }

    //check keyboard buttons
    checkButtonsPress()
    {
        const self = this;

        if(this.is_working && !this.paused)
        {
            //press button, check all currently pressed butons
            window.addEventListener('keydown', function(e){

                self.keys[e.code] = true;
                        
                self.button_actions.forEach(function(button_action){
                    
                    if(self.keys[button_action.code])
                    {
                        button_action.action();
                    }
        
                });

            });
    
            //release button, check only one released currently button
            window.addEventListener('keyup', function(e){

                self.keys[e.code] = false;
            
                self.release_button_actions.forEach(function(release_button_action){
                    
                    if(e.code == release_button_action.code)
                    {
                        release_button_action.action();
                    }
        
                });

            });
        }
    }

    //paralax effect for all game-objects
    //speed - float/int
    paralaxMoveX(speed)
    {
        this.game_objects.forEach(function(game_object){
            let movement = game_object.paralax_force * speed;

            game_object.position.x += movement;
            game_object.paralax_scroll += movement;
        });
    }

}