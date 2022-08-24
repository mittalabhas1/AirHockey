var c = document.getElementById("airHockeyCanvas");
var ctx = c.getContext("2d");

var e = 0.8;

var radius = {
	players: 30,
	ball: 20,
	offSet: 0.60
};

var ball = {
	x: c.width / 2,
	y: c.height / 2,
	radius: radius.ball,
	speed_x: 80,
	speed_y: 60,
	color: '#C9E9BD',
	move: false,
	hit: false,
	counter: 0.01
};

var player1 = {
	x: 100,
	y: c.height / 2,
	radius: radius.players,
	color: 'white',
	max_x: c.width / 2 - radius.players,
	min_x: radius.players,
	max_y: c.height - radius.players,
	min_y: radius.players
};

var player2 = {
	x: c.width - 100,
	y: c.height / 2,
	radius: radius.players,
	color: 'white',
	max_x: c.width - radius.players,
	min_x: c.width / 2 + radius.players,
	max_y: c.height - radius.players,
	min_y: radius.players
};

var bg = {
	color: "#4F4FFF",
	base: "#000000"
};

var goalPost = {
	width: 10,
	posX_1: 0,
	posX_2: c.width - 10,
	height: 2*c.height / 5,
	posY: 3*c.height / 10
};

var score = {
	player1: 0,
	player2: 0
};

var players = [];
players[0] = player1;
players[1] = player2;

let playerNumber = 1;

const setPlayerNumber = num => {
	playerNumber = num;
};

function render() {

	// making the center line
	ctx.fillStyle = bg.color;
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.moveTo(c.width / 2,0);
	ctx.lineTo(c.width / 2, c.height);
	ctx.stroke();

	//making the big circles
	ctx.beginPath();
	ctx.arc(c.width / 2, c.height / 2, c.height / 5, 0, 2 * Math.PI);
	ctx.strokeStyle = bg.base;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(10, c.height / 2, c.height / 5, 0, 2 * Math.PI);
	ctx.strokeStyle = bg.base;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(c.width - 10, c.height / 2, c.height / 5, 0, 2 * Math.PI);
	ctx.strokeStyle = bg.base;
	ctx.stroke();

	//making the cue ball
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.strokeStyle = ball.color;
	ctx.stroke();

	//making goal posts
	ctx.fillStyle = bg.base;
	ctx.fillRect(goalPost.posX_1, goalPost.posY, goalPost.width, goalPost.height);
	ctx.fillRect(goalPost.posX_2, goalPost.posY, goalPost.width, goalPost.height);

	//player1
	ctx.beginPath();
	ctx.arc(player1.x, player1.y, player1.radius, 0, 2 * Math.PI);
	ctx.fillStyle = player1.color;
	ctx.fill();
	ctx.strokeStyle = player1.color;
	ctx.arc(player1.x, player1.y, player1.radius / 2, 0, 2 * Math.PI);
	ctx.strokeStyle = "black";
	ctx.stroke();

	//player2
	ctx.beginPath();
	ctx.arc(player2.x, player2.y ,player2.radius, -Math.PI, Math.PI);
	ctx.fillStyle = player2.color;
	ctx.fill();
	ctx.strokeStyle = player2.color;
	ctx.arc(player2.x, player2.y, player2.radius / 2, -Math.PI, Math.PI);
	ctx.strokeStyle = "black";
	ctx.stroke();

	checkAllHits();
	checkBoundariesForBall();
}

function getMousePos(c, event) {
	var rect = c.getBoundingClientRect();
	return {
	  x: event.clientX - rect.left,
	  y: event.clientY - rect.top
	};
}

function erase() {
	// console.log(ball.x+", "+ball.y+", "+distance);
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
	ctx.fillStyle = bg.color;
	ctx.fill();
	ctx.strokeStyle = bg.color;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(500, 0);
	ctx.lineTo(500, 500);
	ctx.strokeStyle = bg.base;
	ctx.stroke();
}

function coordinates(event){
	var mousePos = getMousePos(c, event);
	// console.log(mousePos.x+", "+mousePos.y);
	y = mousePos.y - ball.y;
	x = mousePos.x - ball.x;
	slope = y/x;
	// console.log(slope);
	distance = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2));
	moveBall(distance, slope, mousePos);
}

function hitBall(slope) {
	ball.hit = true;
	ball.move = true;
	erase();
	var displacement = {
		x: ball.speed_x * ball.counter,
		y: ball.speed_y * ball.counter
	};
	deltaX = displacement.x * Math.cos(Math.atan(slope));
	deltaY = displacement.y * Math.sin(Math.atan(slope));
	if (slope <= 0 && players[playerNumber - 1].x < ball.x && ball.hit) {
		ball.move = 1;
		ball.x += deltaX;
		ball.y -= deltaY;
	}  else if (slope > 0 && players[playerNumber - 1].x > ball.x && ball.hit) {
		ball.move = 2;
		ball.x -= deltaX;
		ball.y -= deltaY;
	} else if (slope <= 0 && players[playerNumber - 1].x > ball.x && ball.hit) {
		ball.move = 3;
		ball.x -= deltaX;
		ball.y += deltaY;
	} else if (slope > 0 && players[playerNumber - 1].x < ball.x && ball.hit) {
		ball.move = 4;
		ball.x += deltaX;
		ball.y += deltaY;
	}
	ball.hit = false;
	// console.log(ball.x+", "+ball.y+", "+distance);
	render();
	// distance -= displacement;
	// if(distance > 0){
		// setTimeout(function(){
			moveBall();
		// }, 10);
	// }
}

function moveBall() {
	if (ball.move) {
		erase();
		var displacement = {
			x: ball.speed_x * ball.counter,
			y: ball.speed_y * ball.counter
		};
		deltaX = displacement.x*Math.cos(Math.atan(slope));
		deltaY = displacement.y*Math.sin(Math.atan(slope));
		if(ball.move == 1){
			ball.x += deltaX;
			ball.y -= deltaY;
		} else if(ball.move == 2){
			ball.x -= deltaX;
			ball.y -= deltaY;
		} else if(ball.move == 3){
			ball.x -= deltaX;
			ball.y += deltaY;
		} else if(ball.move == 4){
			ball.x += deltaX;
			ball.y += deltaY;
		}
		render();
		setTimeout(function(){
			moveBall();
		}, 5);
	}
}

function checkBoundariesForBall() {
	if(ball.x >= c.width || ball.x <= 0)
		if (ball.y > goalPost.posY && ball.y < goalPost.posY + goalPost.height){
			goal();
			ball.move = false;
			ball.x = c.width / 2;
			ball.y = c.height / 2;
		} else
			ball.speed_x = - e * ball.speed_x;
	if(ball.y >= c.height || ball.y <= 0)
		ball.speed_y = - e * ball.speed_y;
}

function movePlayer(event, number) {
	setPlayerNumber(number);
	erase();
	var mousePos = getMousePos(c, event);
	// console.log(mousePos.x+", "+mousePos.y);
	if(players[playerNumber - 1].min_x <= mousePos.x && mousePos.x <= players[playerNumber - 1].max_x && players[playerNumber - 1].min_y <= mousePos.y && mousePos.y <= players[playerNumber - 1].max_y){
		players[playerNumber - 1].x = mousePos.x;
		players[playerNumber - 1].y = mousePos.y;
	}
	render();
}

function checkAngle(number) {
	y = (ball.y - players[number-1].y);
	x = (ball.x - players[number-1].x);
	slope = y/x;
	// console.log(slope);
	return slope;
}

function checkHit(number) {
	distance = Math.sqrt(Math.pow(players[number-1].x - ball.x, 2) + Math.pow(players[number-1].y - ball.y, 2));
	// console.log(distance);
	if(distance + radius.offSet >= players[number-1].radius + ball.radius && distance - radius.offSet < players[number-1].radius + ball.radius){
		// console.log("yes!!");
		var slope = checkAngle(number);
		ball.hit = true;
		hitBall(slope, number);
	}
}

const checkAllHits = () => {
	players.forEach((_p, i) => checkHit(i + 1));
	checkBoundariesForBall();
};

function goal() {
	// console.log('goal');
	document.getElementById('goal').style.display = 'block';
	setTimeout(function(){
		document.getElementById('goal').style.display = 'none';
	}, 3000);
}

render();