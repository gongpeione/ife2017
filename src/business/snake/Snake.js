import { g, CONST } from '../../gtool';

const POINT_TYPE = {
    empty: 0,
    snake: 1,
    food: 2
};
const defaultOption = {
    width: 600,
    height: 400,
    blockWidth: 20,
    color: {
        bg: '#333',
        snake: '#eee',
        snakeHead: '#fff',
        food: '#796'
    },
};
const DIRECTION = {
    up: CONST.KEY_CODE.UP,
    right: CONST.KEY_CODE.RIGHT,
    down: CONST.KEY_CODE.DOWN,
    left: CONST.KEY_CODE.LEFT
};

// Generate direction backward map
const backwardMap = {};
const backward = [['up', 'down'], ['down', 'up'], ['left', 'right'], ['right', 'left']];
backward.forEach(dirPair => {
    backwardMap[DIRECTION[dirPair[0]]] = DIRECTION[dirPair[1]];
});

const keyCodeList = {
    direction: [DIRECTION.up, DIRECTION.right, DIRECTION.down, DIRECTION.left],
    control: []
}
export default class Snake {
    constructor (parent, option) {
        this.parent = typeof parent === 'string' ? g.$(parent) : parent;
        this.option = g.merge(defaultOption, option);
        this.map = [];
        this.snakeBody = [[2, 0], [1, 0], [0, 0]];
        this.snakeHeadAnchor = 0;
        this.direction = DIRECTION.right;
        this.isPlaying = false;
        this.speed = 1;

        // canvas init
        if (this.parent.tagName.toLowerCase() === 'canvas') {
            this.canvas = parent;
        } else {
            this.canvas = document.createElement('canvas');
            this.parent.appendChild(this.canvas);

            this.canvas.width = this.option.width;
            this.canvas.height = this.option.height;
        }
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.brush = this.canvas.getContext('2d');

        this.init();
    }

    init () {

        const blockX = this.width / this.option.blockWidth;
        const blockY = this.height / this.option.blockWidth;

        // map init
        for (let y = 0; y < blockY; y++) {
            const row = [];
            for (let x = 0; x < blockX; x++) {
                row.push(POINT_TYPE.empty);
            }
            this.map.push(row);
        }

        // background under map
        this.brush.fillStyle = '#999';
        this.brush.fillRect(0, 0, this.width, this.height);

        this.randomFood();
        this.mapRender();

        this.keydownHandler = this.keydown.bind(this);
        document.addEventListener('keydown', this.keydownHandler);

        this.isPlaying = true;
        this.startTick();
    }

    startTick () {
        setTimeout(() => {
            if (this.isPlaying) {
                this.snakeMove();
                this.startTick();
            }
        }, 500 * this.speed);
    }

    keydown (e) {
        const keycode = e.keyCode;
        if (keyCodeList.direction.indexOf(keycode) >= 0) {
            console.log(this.direction, keycode, backwardMap[keycode]);
            if (this.direction === keycode || this.direction === backwardMap[keycode]) {
                return
            }
            this.direction = keycode;
        }
    }

    randomFood () {
        const x = Math.random() * (this.map[0].length - 1);
        const y = Math.random() * (this.map.length - 1);
        const position = [Math.round(x), Math.round(y)];
        console.log(position);
        if (this.snakeAtPosition(position)) {
            this.randomFood();
        } else {
            this.foodPosition = position;
        }
    }

    end () {
        this.isPlaying = false;
        // document.removeEventListener('keydown', this.keydownHandler);
    }

    mapRender () {
        // console.log(JSON.stringify(this.map));
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                
                const position = [x, y];
                const startPoint = [x * this.option.blockWidth, y * this.option.blockWidth];

                this.brush.fillStyle = this.option.color.bg;
                // To determine whether the snake's body at this position
                if (this.snakeAtPosition(position)) {
                    if (this.snakeHeadAtPosition(position)) {
                        this.brush.fillStyle = this.option.color.snakeHead;
                    } else {
                        this.brush.fillStyle = this.option.color.snake;
                    }
                }

                if (this.foodAtPosition(position)) {
                    this.brush.fillStyle = this.option.color.food;
                }
                
                this.brush.fillRect(
                    ...startPoint, 
                    this.option.blockWidth, 
                    this.option.blockWidth
                );
                // row.push(POINT_TYPE.empty);
            }
        }
    }

    snakeAtPosition (position, withoutHead = false) {
        let body;
        const mapPosition = JSON.stringify(position);
        const tmpBody = Object.assign([], this.snakeBody);
        if (withoutHead) {
            tmpBody.splice(this.snakeHeadAnchor, 1)
            body = JSON.stringify(tmpBody);
        } else {
            body = JSON.stringify(tmpBody);
        }
        // console.log(body, withoutHead);
        return body.indexOf(mapPosition) >= 0;
    }
    snakeHeadAtPosition (position) {
        const head = JSON.stringify(this.snakeBody[this.snakeHeadAnchor]);
        const mapPosition = JSON.stringify(position);
        return head.indexOf(mapPosition) === 0;
    }
    foodAtPosition (position) {
        const food = JSON.stringify(this.foodPosition);
        const mapPosition = JSON.stringify(position);
        return food.indexOf(mapPosition) === 0;
    }

    snakeMove () {
        const head = this.snakeHeadAnchor;
        const snakeLength = this.snakeBody.length;
        let oldPosition = Object.assign([], this.snakeBody[head]);

        // Update snake's head position
        switch (this.direction) {
            case DIRECTION.right: this.snakeBody[head][0]++; break;
            case DIRECTION.left: this.snakeBody[head][0]--; break;
            case DIRECTION.up: this.snakeBody[head][1]--; break;
            case DIRECTION.down: this.snakeBody[head][1]++; break;
        }

        // crossing the wall or biting itself, game over
        if (
            this.snakeBody[head][0] > this.map[0].length - 1 ||
            this.snakeBody[head][0] < 0 ||
            this.snakeBody[head][1] > this.map.length - 1 ||
            this.snakeBody[head][1] < 0 ||
            this.snakeAtPosition(this.snakeBody[head], true)
        ) {
            console.log('end');
            this.end();
            return;
        }

        for (let i = 1; i < snakeLength; i++) {
            const tempPosition = this.snakeBody[i];
            this.snakeBody[i] = oldPosition;
            oldPosition = tempPosition;
        }
        
        // little snake ate the food and the tail grow longer
        if (this.foodAtPosition([this.snakeBody[head][0], this.snakeBody[head][1]])) {
            this.snakeBody.push(oldPosition);
            this.randomFood();
        }
        
        this.mapRender();
    }
}