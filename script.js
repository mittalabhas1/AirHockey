// function CanvasCtrl($scope) {
	
// 	var canvas = document.getElementById('myCanvas');
// 	var context = canvas.getContext('2d');

// 	var point = {
// 		x: 100,
// 		y: 100,
// 		amount: 50
// 	};
//     $scope.draw(point);

//     $scope.draw = function(data) {
//         context.beginPath();
//         context.arc(data.x, data.y, data.amount, 0, 2 * Math.PI);
//         context.fillStyle = "#ccddff";
//         context.fill();
//         context.lineWidth = 1;
//         context.strokeStyle = "#666666";
//         context.stroke();
//     }

// }

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var radius = {
	players: 30,
	ball: 20,
	offSet: 1
};

var ball = {
    x: 500,
    y: 250,
    radius: radius.ball,
    speed: 50,
    color: '#333'
};

var player1 = {
    x: 50,
    y: 250,
    radius: radius.players,
    color: '#f00',
    max_x: c.width/2 - radius.players,
    min_x: radius.players,
    max_y: c.height - radius.players,
    min_y: radius.players
};

var player2 = {
    x: 950,
    y: 250,
    radius: radius.players,
    color: '#00f',
    max_x: c.width - radius.players,
    min_x: c.width/2 + radius.players,
    max_y: c.height - radius.players,
    min_y: radius.players
};

var bg = {
	color: "green"
};

var players = [];
players[0] = player1;
players[1] = player2;

render();

function render() {

	// making the center line
	ctx.fillStyle = bg.color;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.moveTo(500,0);
	ctx.lineTo(500,500);
	ctx.stroke();

	//making the cue ball
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.strokeStyle = bg.color;
	ctx.stroke();

	//player1
	ctx.beginPath();
	ctx.arc(player1.x,player1.y,player1.radius,0,2*Math.PI);
	ctx.fillStyle = player1.color;
	ctx.fill();
	ctx.strokeStyle = player1.color;
	ctx.stroke();

	//player2
	ctx.beginPath();
	ctx.arc(player2.x,player2.y,player2.radius,0,2*Math.PI);
	ctx.fillStyle = player2.color;
	ctx.fill();
	ctx.strokeStyle = player2.color;
	ctx.stroke();
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
	ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
	ctx.fillStyle = bg.color;
	ctx.fill();
	ctx.strokeStyle = bg.color;
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(500,0);
	ctx.lineTo(500,500);
	ctx.strokeStyle = "black";
	ctx.stroke();
}

function coordinates(event){
	var mousePos = getMousePos(c, event);
	// console.log(mousePos.x+", "+mousePos.y);
	y = mousePos.y - ball.y;
	x = mousePos.x - ball.x;
	slope = y/x;
	console.log(slope);
	distance = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2));
	moveBall(distance, slope, mousePos);
}

function moveBall(slope) {
	erase();
	displacement = ball.speed * 0.1;
	if (slope <= 0) {
		ball.x = ball.x + displacement*Math.cos(Math.atan(slope));
		ball.y = ball.y + displacement*Math.sin(Math.atan(slope));
	} else {
		ball.x = ball.x - displacement*Math.cos(Math.atan(slope));
		ball.y = ball.y - displacement*Math.sin(Math.atan(slope));
	}
	// console.log(ball.x+", "+ball.y+", "+distance);
	render();
	// distance -= displacement;
	// if(distance > 0){
		setTimeout(function(){
			moveBall(slope)
		}, 10);
	// }
}

function movePlayer(event, number) {
	erase();
	var mousePos = getMousePos(c, event);
	// console.log(mousePos.x+", "+mousePos.y);
	if(players[number-1].min_x <= mousePos.x && mousePos.x <= players[number-1].max_x && players[number-1].min_y <= mousePos.y && mousePos.y <= players[number-1].max_y){
		players[number-1].x = mousePos.x;
		players[number-1].y = mousePos.y;
	}
	render();
	checkHit(number);
}

function checkAngle(number) {
	y = (players[number-1].y - ball.y);
	x = (players[number-1].x - ball.x);
	slope = x/y;
	// console.log(-slope);
	return slope;
}

function checkHit(number) {
	distance = Math.sqrt(Math.pow(players[number-1].x - ball.x, 2) + Math.pow(players[number-1].y - ball.y, 2));
	// console.log(distance);
	if(distance + radius.offSet >= players[number-1].radius + ball.radius && distance - radius.offSet <= players[number-1].radius + ball.radius){
		// console.log("yes!!");
		var slope = checkAngle(number);
		moveBall(slope);
	}
}