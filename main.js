const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(map) {
        this.map = map;
        this.win = false;
        this.lose = false;
        this.currentPosition = { x: 0, y: 0 };
    }
    print() {
        this.map.map(item => {
            console.log(item.join(""));
        })
    }

    checkPosition() {
        if (this.map[this.currentPosition.y][this.currentPosition.x] === hole || this.map[this.currentPosition.y][this.currentPosition.x] === undefined) {
            this.lose = true;
        } else if (this.map[this.currentPosition.y][this.currentPosition.x] === hat) {
            this.win = true;
        } else {
            this.map[this.currentPosition.y][this.currentPosition.x] = pathCharacter;
        }
    }

    onLeft() {
        this.currentPosition.x++;
        this.checkPosition();
    }

    onRight() {
        this.currentPosition.x--;
        this.checkPosition();
    }

    onUp() {
        this.currentPosition.y--;
        this.checkPosition();
    }

    onDown(){
        this.currentPosition.y++;
        this.checkPosition();
    }


    start() {
        while (!this.win && !this.lose) {
            this.print();
            console.log("Where do you want to move?");
            const user = prompt();
            switch (user) {
                case "left":
                    this.onLeft();
                    break;
                case "right":
                    this.onRight();
                    break;
                case "up":
                    this.onUp();
                    break;
                case "down":
                    this.onDown();
                    break;
                default:
                    console.log("invalid command try again!");
            }
            //console.log(`Pos X: ${this.currentPosition.x}, Pos Y: ${this.currentPosition.y}`)
        }
        if (this.lose) console.log("You lost!! You just fell down the hole!!");
        if (this.win) console.log("You found your hat!!! You win!!!");
    }

    static generateField(w = 3, h = 3, numHoles = 3){
        const field = [];
        for(let i = 0; i < h; i++){
            field.push([]);
            field[i] = [];
            for(let j=0; j < w; j++){
                field[i].push(fieldCharacter);
            }
        }
        field[0][0] = pathCharacter;
        field[Math.round(Math.random() * h)][Math.round(Math.random() * w)] = hat;
        const hats = Math.floor((h*w)/numHoles);
        for(let i=0; i<hats; i++){
            let randomX = Math.floor(Math.random() * w);
            let randomY = Math.floor(Math.random()  * h);
            while(true){
                if(field[randomY][randomX] !== hole && field[randomY][randomX] !== hat && field[randomY][randomX] !== pathCharacter ){
                    break;
                }
                randomX = Math.round(Math.random() * w);
                randomY = Math.round(Math.random()  * h);
            }
            field[randomY][randomX] = hole;
        }
        return field;
    }
}

const myfield = new Field(Field.generateField(8,8,5));

myfield.start();



