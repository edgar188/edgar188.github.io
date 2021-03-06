"use strict";

(function createTetrisWorld() {
	let world = document.getElementById("world");
	for(let y = 0; y < 22; y++) {
		let row = document.createElement("div");
		row.className = "row";
		row.id = y;
		if(y < 2) row.dataset.hidden = 10;
		for(let x = 0; x < 10; x++) {
			let box = document.createElement("div");
			box.className = "box";
			box.innerText = y + "." + x;
			box.dataset.state = 0;
			row.appendChild(box);
		}
		world.appendChild(row);
	}
})();

const allBoxes = document.getElementsByClassName("box"),
	allRows = document.getElementsByClassName("row"),
	tetrominoes = [
		[0.4, 0.5, 0.6, 1.6], // J 
		[0.4, 0.5, 1.4, 1.5], // O 
		[0.4, 0.5, 1.5, 1.6], // Z 
		[0.3, 0.4, 0.5, 0.6], // I 
		[0.4, 0.5, 0.6, 1.4], // L
		[0.5, 0.6, 1.4, 1.5], // S 
		[0.4, 0.5, 0.6, 1.5] // T 
	];
let timer,
	level = document.getElementsByClassName("statistics")[1].children[0],
	score = document.getElementsByClassName("statistics")[2].children[0],
	lines = document.getElementsByClassName("statistics")[3].children[0],
	record = document.getElementsByClassName("statistics")[0].children[0],
	scoreSum = +score.innerText,
	linesSum = +lines.innerText,
	levelSum = +level.innerText;

localStorage.setItem('record', localStorage.getItem("record") || 38);
record.innerText = localStorage.getItem('record');

function moveLeft() {
	let activeBoxes = [];
	for(let box of allBoxes) if(box.dataset.state == 1) activeBoxes.push(box.innerText);
	return (canMove(activeBoxes, "left")) ? move("left", activeBoxes) : true;
}

function moveRight() {
	let activeBoxes = [];
	for(let box of allBoxes) if(box.dataset.state == 1) activeBoxes.push(box.innerText);
	return (canMove(activeBoxes, "right")) ? move("right", activeBoxes) : true;
}

function moveDown() {
	let activeBoxes = [];
	for(let box of allBoxes) if(box.dataset.state == 1) activeBoxes.push(box.innerText);

	if(gameOver(activeBoxes) == true) {
		return setTimeout(function(){
			if (scoreSum > localStorage.getItem('record')) localStorage.setItem('record', scoreSum);
			location.reload();
			alert(`Game Over ! Your Score: ${scoreSum}`);
		}, 800);
	}

	if(canMove(activeBoxes, "down")) return move("down", activeBoxes);
	else {
		clearInterval(timer);
		timer = null;

		for(let el of allBoxes) {
			for(let box of activeBoxes) {
				if(el.innerText == box) {
					el.dataset.state = 2;
					break;
				}
			}
		}
	return start();	
	}
}

function rotate() {
	sound("selection.wav");
	let n = +document.getElementsByTagName("span")[0].innerText,
		activeBoxes = [];

	for(let box of allBoxes) if(box.dataset.state == 1) activeBoxes.push(box.innerText);
	
	if (n == 3) {
		// I
		for(let a = 0; a < allBoxes.length; a++) {
			if (activeBoxes[0] == allBoxes[a].innerText &&
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+1].dataset.state == 1 &&
				allBoxes[a+2].dataset.state == 1 && 
				allBoxes[a+3].dataset.state == 1 &&
				allBoxes[a+11].dataset.state != 2 &&
				allBoxes[a+21].dataset.state != 2 &&
				allBoxes[a+31].dataset.state != 2) 
			{
					allBoxes[a+11].dataset.state = 1;
					allBoxes[a+21].dataset.state = 1;
					allBoxes[a+31].dataset.state = 1;
					allBoxes[a].dataset.state = 0;
					allBoxes[a+2].dataset.state = 0;
					allBoxes[a+3].dataset.state = 0;
					activeBoxes = [allBoxes[a+1].innerText, 
									allBoxes[a+11].innerText,
									allBoxes[a+21].innerText,
									allBoxes[a+31].innerText];
				break;
			}
			else if (
				activeBoxes[0] == allBoxes[a].innerText &&
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+10].dataset.state == 1 && 
				allBoxes[a+20].dataset.state == 1 && 
				allBoxes[a+30].dataset.state == 1 &&
				allBoxes[a-1].dataset.state != 2 &&
				allBoxes[a+1].dataset.state != 2 &&
				allBoxes[a+2].dataset.state != 2) 
				{
					for(let el of activeBoxes) if(el[el.length-1] == 0 || el[el.length-1] == 9 || el[el.length-1] == 8) return;
			
					allBoxes[a-1].dataset.state = 1;
					allBoxes[a+1].dataset.state = 1;
					allBoxes[a+2].dataset.state = 1;
					allBoxes[a+10].dataset.state = 0;
					allBoxes[a+20].dataset.state = 0;
					allBoxes[a+30].dataset.state = 0;
					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a-1].innerText,
									allBoxes[a+1].innerText,
									allBoxes[a+2].innerText];
					break;
				}
		}
	}
	else if (n == 6) {
		// T
			for(let a = 0; a < allBoxes.length; a++) {	
				if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+1].dataset.state == 1 &&
					allBoxes[a+2].dataset.state == 1 && 
					allBoxes[a+11].dataset.state == 1 &&
					allBoxes[a+10].dataset.state != 2 &&
					allBoxes[a+21].dataset.state != 2
					) 
				{
					allBoxes[a+10].dataset.state = 1;
					allBoxes[a+21].dataset.state = 1;
					allBoxes[a+2].dataset.state = 0;
					allBoxes[a].dataset.state = 0;
					activeBoxes = [allBoxes[a+10].innerText, 
									allBoxes[a+11].innerText,
									allBoxes[a+21].innerText,
									allBoxes[a+1].innerText];
					break;
				}
				else if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+9].dataset.state == 1 &&
					allBoxes[a+10].dataset.state == 1 && 
					allBoxes[a+20].dataset.state == 1 &&
					allBoxes[a+11].dataset.state != 2) 
				{
					let temp = 0;
					for(let el of activeBoxes) if(el[el.length-1] == 9) temp +=1;
				
					if(temp > 1) return
					allBoxes[a+11].dataset.state = 1;
					allBoxes[a+20].dataset.state = 0;
					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a+9].innerText,
									allBoxes[a+10].innerText,
									allBoxes[a+11].innerText];
					break;
				}
				else if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+9].dataset.state == 1 &&
					allBoxes[a+10].dataset.state == 1 && 
					allBoxes[a+11].dataset.state == 1 &&
					allBoxes[a+20].dataset.state != 2) 
				{
					allBoxes[a+20].dataset.state = 1;
					allBoxes[a+9].dataset.state = 0;
					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a+10].innerText,
									allBoxes[a+11].innerText,
									allBoxes[a+20].innerText];
					break;
				}
				else if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+10].dataset.state == 1 && 
					allBoxes[a+11].dataset.state == 1 &&
					allBoxes[a+20].dataset.state == 1 &&
					allBoxes[a+1].dataset.state != 2 &&
					allBoxes[a-1].dataset.state != 2) 
				{
					let temp = 0;
					for(let el of activeBoxes) if(el[el.length-1] == 0) temp +=1;

					if(temp > 1) return;
					allBoxes[a+1].dataset.state = 1;
					allBoxes[a-1].dataset.state = 1;
					allBoxes[a+20].dataset.state = 0;
					allBoxes[a+11].dataset.state = 0;

					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a+1].innerText,
									allBoxes[a-1].innerText,
									allBoxes[a+10].innerText];
					break;
				}
			}
		}
	else if (n == 4) {
		// L
		for(let a = 0; a < allBoxes.length; a++) {
				if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+1].dataset.state == 1 &&
					allBoxes[a+2].dataset.state == 1 && 
					allBoxes[a+10].dataset.state == 1 &&
					allBoxes[a+11].dataset.state != 2 &&
					allBoxes[a+21].dataset.state != 2
					) 
				{
					allBoxes[a+11].dataset.state = 1;
					allBoxes[a+21].dataset.state = 1;
					allBoxes[a+2].dataset.state = 0;
					allBoxes[a+10].dataset.state = 0;
					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a+1].innerText,
									allBoxes[a+11].innerText,
									allBoxes[a+21].innerText];
					break;
				}
				else if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+1].dataset.state == 1 &&
					allBoxes[a+11].dataset.state == 1 && 
					allBoxes[a+21].dataset.state == 1 &&
					allBoxes[a+2].dataset.state != 2 &&
					allBoxes[a+10].dataset.state != 2 &&
					allBoxes[a+12].dataset.state != 2) {

						for(let el of activeBoxes) if (el[el.length-1] == 9 || el[el.length-1] == 0) return; 
					
						allBoxes[a+2].dataset.state = 1;
						allBoxes[a+10].dataset.state = 1;
						allBoxes[a+12].dataset.state = 1;
						allBoxes[a].dataset.state = 0;
						allBoxes[a+1].dataset.state = 0;
						allBoxes[a+21].dataset.state = 0;
						activeBoxes = [allBoxes[a+2].innerText, 
										allBoxes[a+10].innerText,
										allBoxes[a+11].innerText,
										allBoxes[a+12].innerText];
					break;				
				}
				else if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a+10].dataset.state == 1 &&
					allBoxes[a+9].dataset.state == 1 &&
					allBoxes[a+8].dataset.state == 1 && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+2].dataset.state != 2 &&
					allBoxes[a+18].dataset.state != 2 &&
					allBoxes[a+19].dataset.state != 2) {

						for(let el of activeBoxes) if (el[el.length-1] == 9 || el[el.length-1] == 0) return; 
						
						allBoxes[a-2].dataset.state = 1;
						allBoxes[a+18].dataset.state = 1;
						allBoxes[a+19].dataset.state = 1;
						allBoxes[a].dataset.state = 0;
						allBoxes[a+10].dataset.state = 0;
						allBoxes[a+9].dataset.state = 0;
						activeBoxes = [allBoxes[a-2].innerText, 
										allBoxes[a+18].innerText,
										allBoxes[a+19].innerText,
										allBoxes[a+8].innerText];
					break;				
				}
				else if (activeBoxes[0] == allBoxes[a].innerText &&
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+10].dataset.state == 1 &&
					allBoxes[a+20].dataset.state == 1 &&
					allBoxes[a+21].dataset.state == 1 && 
					allBoxes[a+1].dataset.state != 2 &&
					allBoxes[a+2].dataset.state != 2) {
						allBoxes[a+1].dataset.state = 1;
						allBoxes[a+2].dataset.state = 1;
						allBoxes[a+20].dataset.state = 0;
						allBoxes[a+21].dataset.state = 0;
						activeBoxes = [allBoxes[a].innerText, 
										allBoxes[a+1].innerText,
										allBoxes[a+2].innerText,
										allBoxes[a+10].innerText];
					break;				
				}
			}
		}	
	else if(n == 0) {
			// J
			for(let a = 0; a < allBoxes.length; a++) {
				if (activeBoxes[0] == allBoxes[a].innerText && 
					allBoxes[a].dataset.state == 1 &&
					allBoxes[a+1].dataset.state == 1 &&
					allBoxes[a+2].dataset.state == 1 && 
					allBoxes[a+12].dataset.state == 1 &&
					allBoxes[a+20].dataset.state != 2 &&
					allBoxes[a+21].dataset.state != 2) 
				{	
					allBoxes[a+11].dataset.state = 1;
					allBoxes[a+20].dataset.state = 1;
					allBoxes[a+21].dataset.state = 1;
					allBoxes[a].dataset.state = 0;
					allBoxes[a+2].dataset.state = 0;
					allBoxes[a+12].dataset.state = 0;
					activeBoxes = [allBoxes[a+1].innerText, 
									allBoxes[a+11].innerText,
									allBoxes[a+21].innerText,
									allBoxes[a+20].innerText];
				break;
			}
			else if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+10].dataset.state == 1 &&
				allBoxes[a+19].dataset.state == 1 && 
				allBoxes[a+20].dataset.state == 1 &&
				allBoxes[a-1].dataset.state != 2 &&
				allBoxes[a+11].dataset.state != 2) {

					for(let el of activeBoxes) if(el[el.length-1] == 9 || el[el.length-1] == 0) return

					allBoxes[a-1].dataset.state = 1;
					allBoxes[a+9].dataset.state = 1;
					allBoxes[a+10].dataset.state = 1;
					allBoxes[a+11].dataset.state = 1;
					allBoxes[a].dataset.state = 0;
					allBoxes[a+19].dataset.state = 0;
					allBoxes[a+20].dataset.state = 0;
					activeBoxes = [allBoxes[a-1].innerText, 
									allBoxes[a+9].innerText,
									allBoxes[a+10].innerText,
									allBoxes[a+11].innerText];
				break;
			}
			else if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+10].dataset.state == 1 &&
				allBoxes[a+11].dataset.state == 1 && 
				allBoxes[a+12].dataset.state == 1 &&
				allBoxes[a+1].dataset.state != 2 &&
				allBoxes[a+20].dataset.state != 2) {
					allBoxes[a+1].dataset.state = 1;
					allBoxes[a+20].dataset.state = 1;
					allBoxes[a+11].dataset.state = 0;
					allBoxes[a+12].dataset.state = 0;
					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a+1].innerText,
									allBoxes[a+10].innerText,
									allBoxes[a+20].innerText];
				break;
			}
			else if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+1].dataset.state == 1 &&
				allBoxes[a+10].dataset.state == 1 && 
				allBoxes[a+20].dataset.state == 1 &&
				allBoxes[a+2].dataset.state != 2 &&
				allBoxes[a+12].dataset.state != 2) {
					for(let el of activeBoxes) if(el[el.length-1] == 0 || el[el.length-1] == 9) return
					
					allBoxes[a+2].dataset.state = 1;
					allBoxes[a+12].dataset.state = 1;
					allBoxes[a+10].dataset.state = 0;
					allBoxes[a+20].dataset.state = 0;
					activeBoxes = [allBoxes[a].innerText, 
									allBoxes[a+1].innerText,
									allBoxes[a+2].innerText,
									allBoxes[a+12].innerText];
				break;
				}
			}
		}
	else if (n == 2) {
		// Z
		for(let a = 0; a < allBoxes.length; a++) {
			if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+1].dataset.state == 1 &&
				allBoxes[a+11].dataset.state == 1 && 
				allBoxes[a+12].dataset.state == 1 &&
				allBoxes[a+10].dataset.state != 2 &&
				allBoxes[a+20].dataset.state != 2) 
			{						
				allBoxes[a+10].dataset.state = 1;
				allBoxes[a+20].dataset.state = 1;
				allBoxes[a].dataset.state = 0;
				allBoxes[a+12].dataset.state = 0;
				activeBoxes = [allBoxes[a+1].innerText, 
								allBoxes[a+10].innerText,
								allBoxes[a+11].innerText,
								allBoxes[a+20].innerText];
				break;
			}
			else if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+9].dataset.state == 1 &&
				allBoxes[a+10].dataset.state == 1 && 
				allBoxes[a+19].dataset.state == 1 &&
				allBoxes[a-1].dataset.state != 2 &&
				allBoxes[a+11].dataset.state != 2) {
				
				for(let el of activeBoxes) if(el[el.length-1] == 9) return;
				
					allBoxes[a-1].dataset.state = 1;
					allBoxes[a+11].dataset.state = 1;
					allBoxes[a+9].dataset.state = 0;
					allBoxes[a+19].dataset.state = 0;
					activeBoxes = [allBoxes[a-1].innerText, 
									allBoxes[a].innerText,
									allBoxes[a+10].innerText,
									allBoxes[a+11].innerText];
				break;
			}
		}
	}
	else if (n == 5) {
		// S
		for(let a = 0; a < allBoxes.length; a++) {
			if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+1].dataset.state == 1 &&
				allBoxes[a+9].dataset.state == 1 && 
				allBoxes[a+10].dataset.state == 1 &&
				allBoxes[a+11].dataset.state != 2 &&
				allBoxes[a+21].dataset.state != 2) 
			{	
				allBoxes[a+11].dataset.state = 1;
				allBoxes[a+21].dataset.state = 1;
				allBoxes[a+1].dataset.state = 0;
				allBoxes[a+9].dataset.state = 0;

				activeBoxes = [allBoxes[a].innerText, 
								allBoxes[a+10].innerText,
								allBoxes[a+11].innerText,
								allBoxes[a+21].innerText];
				break;
			}
			else if (activeBoxes[0] == allBoxes[a].innerText && 
				allBoxes[a].dataset.state == 1 &&
				allBoxes[a+10].dataset.state == 1 &&
				allBoxes[a+11].dataset.state == 1 && 
				allBoxes[a+21].dataset.state == 1 &&
				allBoxes[a+1].dataset.state != 2 &&
				allBoxes[a+9].dataset.state != 2) 
			{	
				for(let el of activeBoxes) if(el[el.length-1] == 0) return
				
				allBoxes[a+1].dataset.state = 1;
				allBoxes[a+9].dataset.state = 1;
				allBoxes[a+11].dataset.state = 0;
				allBoxes[a+21].dataset.state = 0;
				activeBoxes = [allBoxes[a].innerText, 
								allBoxes[a+1].innerText,
								allBoxes[a+9].innerText,
								allBoxes[a+10].innerText];
				break;
			}
		}
	}
}

document.body.onkeydown = function(e) {
	let arrows = document.getElementById("arrows").children;
	switch (e.which) {
		case 38: 
			arrows[0].style.background = "#2F1B11";
			return rotate();
		case 40: 
			arrows[3].style.background = "#2F1B11";
			return moveDown();
		case 37: 
			arrows[2].style.background = "#2F1B11";
			return moveLeft();
		case 39: 
			arrows[4].style.background = "#2F1B11";
			return moveRight();	
	}
}

document.body.onkeyup = function(e) {
	let arrows = document.getElementById("arrows").children;
	switch (e.which) {
		case 38: return arrows[0].style.background = 'burlywood';
		case 40: return arrows[3].style.background = 'burlywood';
		case 37: return arrows[2].style.background = 'burlywood';
		case 39: return arrows[4].style.background = 'burlywood';	
	}
}

function getRandomlyTetrominoes() {
    let randomNum = Math.floor(Math.random()*7);
    document.getElementsByTagName("span")[0].innerText = randomNum;
    return tetrominoes[randomNum];
}

function rowOut() {
	let check;

	for(let row of allRows) {
		check = true;

		for(let box of row.children) {
			if (+box.dataset.state !== 2) {
				check = false;
				break;
			}
		}
		if (check) {
			for(let box of row.children) box.dataset.state = 0;
			
			for(let i = +row.id*10+9; i > 10; i--) allBoxes[i].dataset.state = allBoxes[i-10].dataset.state;
			
			lines.innerText = ++linesSum;
			score.innerText = scoreSum += 10 * levelSum; 
			sound("line.wav");
			if (linesSum % 3 === 0) {
				level.innerText = ++levelSum;
				sound("success.wav");
			}
		}
	}
}

function sound(sound, mainSound) {
	const audio = document.createElement("audio"),
		source = document.createElement("source");
	audio.setAttribute("autoplay", "");
	audio.style.display = 'none';
	if(mainSound) {
		source.src = "sounds/"+mainSound;
		audio.setAttribute("loop", "");
		source.type = "audio/mpeg";
	}else {
		source.src = "sounds/"+sound;
		source.type = "audio/wav";
	}
	audio.appendChild(source);
	document.body.appendChild(audio);
}

function froozenBoxes() {
	let result = [];
	for(let box of allBoxes) if (+box.innerText >= 2 && box.dataset.state == 2) result.push(box.innerText);
	return result;
}

function canMove(currentFigure, to) {
	switch (to) {
		case "down":
			for(let el of currentFigure) {
				if (+el >= 21) {
					sound("fall.wav");
					scoreSum += Math.ceil(Math.random() * 10);
					score.innerText = scoreSum; 
					return false;
				}	

				for(let frozBox of froozenBoxes()) {
					if (+el+1 === +frozBox) {
						for(let currF of currentFigure) {
							for(let box of allBoxes) {
								if(box.innerText == currF) {
									box.dataset.state = 2;
									break;
								}
							}
						}
						scoreSum += Math.ceil(Math.random() * 5);
						score.innerText = scoreSum; 
						sound("fall.wav");
						return false;
					}
				}
			}
		return true;
		// --------------------------------------------------------------------------------------------------
		case "right":
			for(let el of currentFigure) {	
				if(+el[el.length-1] == 9) {
					sound("fall.wav");
					return false;
				}	
				for(let frozBox of froozenBoxes()) {	
					if(Math.round((+el+0.1)*10)/10 == +frozBox && String(+el+1).length == frozBox.length) {
						sound("fall.wav");
						return false;	
					}
				}
			}	
			return true;	
		// --------------------------------------------------------------------------------------------------

		case "left":
			for(let el of currentFigure) {			
				if(+el[el.length-1] == 0) {
					sound("fall.wav");
					return false;
				}
				for(let frozBox of froozenBoxes()) {
					if(Math.round((+el-0.1)*10)/10 == +frozBox && String(+el+1).length == frozBox.length){
						sound("fall.wav");
						return false;
					}
				}
			}
			return true;
	}
}

function start() {
	rowOut();
	let tetromino = getRandomlyTetrominoes();

	for(let row of allRows) {
		if(+row.id < 4) {
			for(let box of row.children) {
				for(let el of tetromino) {
					if (el == box.innerText && box.dataset.state == 0) {
						box.dataset.state = 1;
						break;
					}	
				}
			}
		}else break;
	}

	timer = setInterval(function() {
	let activeBoxes = [];

	for(let box of allBoxes) if(box.dataset.state == 1) activeBoxes.push(box.innerText);
		
	if(gameOver(activeBoxes) == true) {
		sound("gameover.wav");
		return setTimeout(function() {
			if (scoreSum > localStorage.getItem('record')) localStorage.setItem('record', scoreSum);
				location.reload();
				alert(`Game Over ! Your Score: ${scoreSum}`);
		}, 800)
	}

	if(canMove(activeBoxes, "down")) return move("down", activeBoxes);
	else {
		clearInterval(timer);
		timer = null;

		for(let box of activeBoxes) {
			for(let el of allBoxes) {
				if(el.innerText == box && el.innerText.length == box.length) {
					el.dataset.state = 2;
					break;
				}
			}
		}
		return start();
	}
	}, intervTime());
}

function intervTime() {
	if (levelSum < 3) return 1000;
	if (levelSum >= 3 && levelSum < 6) return 800;
	if (levelSum >= 6 && levelSum < 9) return 600;
	return 400;
}

function move(to, arr) {
	switch (to) {
		case "down":
			let downCoords = [];

			for(let el of arr) {
				let first = el.slice(0, el.indexOf("."));
				downCoords.push(el.replace(first, (+first) + 1));
			}
			
			for(let el of arr) {
				for(let box of allBoxes) {
					if (box.dataset.state != "2" && box.innerText == el) {
						box.dataset.state = 0;
						break;
					}
				}
			}

			for(let el of downCoords) {
				for(let box of allBoxes) {
					if (box.dataset.state != "2" && box.innerText == el) {
						box.dataset.state = 1;
						break;
					}
				}
			}
			return;

		case "right":
			let rightCoords = [];

			for(let el of arr) {
				const index = el.indexOf(".");
				el = String(el).split('');
				el.splice(index+1, 1, +el[index+1] + 1);
				rightCoords.push(el.join(''));
			}
			for(let el of arr) {
				for(let box of allBoxes) {
					if (box.dataset.state != 2 && box.innerText == el) {
						box.dataset.state = 0;
						break;
					}
				}
			}
			for(let el of rightCoords) {
				for(let box of allBoxes) {
					if (!box.dataset.state != 2 && box.innerText == el) {
						box.dataset.state = 1;
						break;
					}
				}
			}
			return;

		case "left":
			let leftCoords = [];
			for(let el of arr) {
				const index = el.indexOf(".");
				el = String(el).split('');

				if(el.slice(index+1).length == 1) el.splice(index+1, 1, +el[index+1]-1);
				else el.splice(index+1, 2, +el.slice(index+1).join('')-1);
				leftCoords.push(el.join(""));
			}
			
				for(let el of arr) {
					for(let box of allBoxes) {
						if (+box.dataset.state != 2 && box.innerText == el) {
							box.dataset.state = 0;
							break;
						}
					}
				}
				for(let el of leftCoords) {
					for(let box of allBoxes) {
						if (+box.dataset.state != 2 && box.innerText == el) {
							box.dataset.state = 1;
							break;
						}
					}
				}
		return;
	}
}

function gameOver(figure) {
	for(let box of allRows[2].children) {
		if (box.dataset.state == 2) return true;
	}
}

document.addEventListener("click",function(e) {
	const button = document.getElementsByTagName("button")[0];
	if (e.target == button) {
		sound(undefined, "Tetris.mp3");
		document.getElementsByTagName("span")[0].style.display = "none";
		start();
		e.target.style.display = "none";
	}
}, false)

document.getElementById("arrows").addEventListener("click",function(e) {
	if (e.target == document.getElementById("arrows").children[2]) return moveLeft();
	if (e.target == document.getElementById("arrows").children[4]) return moveRight();
	if (e.target == document.getElementById("arrows").children[3]) return moveDown();
	if (e.target == document.getElementById("arrows").children[0]) return rotate();
},false)