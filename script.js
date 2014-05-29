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

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");


var ball = {
    x: 500,
    y: 250,
    radius: 20,
    speed: 50,
    color: '#333'
};

var bg = {
	color: "white"
};

render();

function render() {
	ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.moveTo(500,0);
	ctx.lineTo(500,500);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.strokeStyle = bg.color;
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

function getMousePos(c, evt) {
	var rect = c.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}
var time = Date.now();
// setInterval(run, 10);

function erase() {
	console.log(ball.x+", "+ball.y+", "+distance);
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

function moveBall(distance, slope, mousePos) {
	erase();
	displacement = ball.speed * 0.1;
	if (mousePos.x - ball.x >= 0) {
		ball.x = ball.x + displacement*Math.cos(Math.atan(slope));
		ball.y = ball.y + displacement*Math.sin(Math.atan(slope));
	} else {
		ball.x = ball.x - displacement*Math.cos(Math.atan(slope));
		ball.y = ball.y - displacement*Math.sin(Math.atan(slope));
	}
	console.log(ball.x+", "+ball.y+", "+distance);
	render();
	distance -= displacement;
	if(distance > 0){
		setTimeout(function(){moveBall(distance, slope, mousePos)}, 10);
	}
}

// ctx.beginPath();
// ctx.arc(50,250,30,0,2*Math.PI);
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(950,250,30,0,2*Math.PI);
// ctx.stroke();