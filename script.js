const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const scoreContainer = document.getElementById("scoreContainer");

const scale = 20;
canvas.width = 500;
canvas.height = 500;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreElement.textContent = highScore;

playButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    playButton.style.display = 'none';
    canvas.style.display = 'block';
    scoreContainer.style.display = 'flex';

    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
            score++;
            scoreElement.textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.textContent = highScore;
            }
        }

        snake.checkCollision();
    }, 150);
}

window.addEventListener('keydown', (evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

function Snake() {
    this.body = [];
    this.body[0] = { x: 5 * scale, y: 5 * scale };
    this.xDirection = 1;
    this.yDirection = 0;
    this.total = 0;

    this.draw = function () {
        for (let i = 0; i < this.body.length; i++) {
            // ctx.fillStyle = "#00FF00";
            ctx.fillStyle = "black";
            ctx.fillRect(this.body[i].x, this.body[i].y, scale, scale);

            if (i === 0) {
                // ctx.fillStyle = "#000000";
                ctx.fillStyle = "white";
                ctx.fillRect(this.body[i].x + 2, this.body[i].y + 2, 4, 4);
                ctx.fillRect(this.body[i].x + 14, this.body[i].y + 2, 4, 4);
            }
        }
    };

    this.update = function () {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = { ...this.body[i - 1] };
        }

        this.body[0].x += this.xDirection * scale;
        this.body[0].y += this.yDirection * scale;

        if (this.body[0].x >= canvas.width) {
            this.body[0].x = 0;
        } else if (this.body[0].x < 0) {
            this.body[0].x = canvas.width;
        }

        if (this.body[0].y >= canvas.height) {
            this.body[0].y = 0;
        } else if (this.body[0].y < 0) {
            this.body[0].y = canvas.height;
        }
    };

    this.changeDirection = function (direction) {
        switch (direction) {
            case 'Up':
                if (this.yDirection === 0) {
                    this.xDirection = 0;
                    this.yDirection = -1;
                }
                break;
            case 'Down':
                if (this.yDirection === 0) {
                    this.xDirection = 0;
                    this.yDirection = 1;
                }
                break;
            case 'Left':
                if (this.xDirection === 0) {
                    this.xDirection = -1;
                    this.yDirection = 0;
                }
                break;
            case 'Right':
                if (this.xDirection === 0) {
                    this.xDirection = 1;
                    this.yDirection = 0;
                }
                break;
        }
    };

    this.eat = function (fruit) {
        if (this.body[0].x === fruit.x && this.body[0].y === fruit.y) {
            this.body.push({});
            this.total++;
            return true;
        }
        return false;
    };

    this.checkCollision = function () {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
                alert[`Score : ${score}\nGAME OVER`];
                playButton.style.display = 'block';
                canvas.style.display = 'none';
                scoreContainer.style.display = 'none';
                this.body = [{ x: 5 * scale, y: 5 * scale }];
                this.total = 0;
                break;
            }
        }
    };
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function () {
        this.x = Math.floor(Math.random() * rows) * scale;
        this.y = Math.floor(Math.random() * columns) * scale;
    };

    this.draw = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}