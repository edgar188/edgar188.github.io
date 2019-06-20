(function createTetrisWorld() {
	let wrapper = document.getElementById("wrapper");
	for(let y = 1; y <= 20; y++) {
		let row = document.createElement("div");
		row.className = "row";
		row.id = y-1;
		for(let x = 1; x <= 10; x++) {
			let box = document.createElement("div");
			box.className = "box";
			box.innerText = y + "." + x;
			box.setAttribute("data-state", 0);
			row.appendChild(box);
		}
		wrapper.appendChild(row);
	}
})();

// ========================================================================
const tetrominoes = [ 
		[1.5, 1.6, 2.5, 2.6], // O
	 	[1.5, 2.5, 3.5, 4.5], // I
		[1.6, 1.7, 2.5, 2.6], // S
		[1.5, 1.6, 2.6, 2.7], // Z
		[1.5, 2.5, 3.5, 3.6], // L
		[1.6, 2.6, 3.6, 3.5], // J
		[1.5, 1.6, 1.7, 2.6 ] // T
];
const allBoxes = document.getElementsByClassName("box");
const allRows = document.getElementsByClassName("row");
let timer = false;

function getRandomlyTetrominoes() {
    let randomNum = Math.floor(Math.random()*7);
    return tetrominoes[randomNum];
}

function rowOut() {
	let cehck;
	let max;

	for(let row of allRows) {
		check = true;
		for(let box of row.children) {
			if (+box.dataset.state !== 2) {
				check = false;
				break;
			}
		}
		if (check) {
			for(let box of row.children) {
				box.dataset.state = 0;
			}
			switch (row.id) {
				case "19":
				max = 199;
					break;
				case "18":
				max = 189;
					break;
				case "17":
				max = 179;
					break;
				case "16":
				max = 169;
					break;
				case "15":
				max = 159;
					break;
				case "14":
				max = 149;
					break;
				case "13":
				max = 139;
					break;
				case "12":
				max = 129;
					break;
				case "11":
				max = 119;
					break;	
				case "10":
				max = 109;
					break;	
				case "9":
				max = 99;
					break;
				case "8":
				max = 89;
					break;	
				case "7":
				max = 79;
					break;
				case "6":
				max = 69;
					break;
				case "5":
				max = 59;
					break;
				case "4":
				max = 49;
					break;	
				case "3":
				max = 39;
					break;	
				case "2":
				max = 29;
					break;	
				case "1":
				max = 19;
					break;	
				case "0":
				max = 9;
					break;																
			}
			
			for(let i = max; i > 10; i--) {
				allBoxes[i].dataset.state = allBoxes[i-10].dataset.state;
			}	
			sound("line.wav");
		}
	}
}

function sound(sound, mainSound) {
		const audio = document.createElement("audio");
		audio.setAttribute("autoplay", "");
		audio.style.display = 'none';
		const source = document.createElement("source");
		if(mainSound) {
			source.src = mainSound;
			source.type = "audio/mpeg";
		}
		else {
			source.src = sound;
			source.type = "audio/wav";
		}
		audio.appendChild(source);
		document.body.appendChild(audio);
}

function froozenBoxes() {
	let result = [];
	for(let box of allBoxes) {
		if (+box.dataset.state === 2) {
			result.push(box.innerText);
		}
	}
	return result;
}

function start() {
	rowOut();
	let tetromino = getRandomlyTetrominoes();

	for(let el of allBoxes) {
		for(let coords of tetromino) {
			if (+coords == +el.innerText && el.dataset.state == 0) {
				el.dataset.state = 1;
				break;
			}
		}
	}
	
	timer = setInterval(function() {
	let activeBoxes = [];

	for(let box of allBoxes) {
		if(+box.dataset.state === 1) {
			activeBoxes.push(box.innerText);
		}
	}
	if(canMove(activeBoxes, "down")) {
		return move("down", activeBoxes);
	}
	else {
		clearInterval(timer);
		timer = null;
		for(let box of activeBoxes) {
			for(let el of allBoxes) {
				if(+el.innerText === +box && el.innerText.length === box.length) {
					el.dataset.state = 2;
					break;
				}
			}
		}
		return start();
	}

	}, 300);
}

function canMove(currentFigure, to) {
	switch (to) {
		case "down":
			for(let el of currentFigure) {
				if (+el > 20) {
					sound("fall.wav");
					return false;
				}	

				for(let frozBox of froozenBoxes()) {
					
					if (+el+1 === +frozBox && el.length === frozBox.length) {
						for(let currF of currentFigure) {
							for(let box of allBoxes) {
								if(+box.innerText == +currF && box.innerText.length === currF.length) {
									box.dataset.state = 2;
									break;
								}
							}
						}
						sound("fall.wav");
						return false;
					}
				}
			}
		return true;
		// --------------------------------------------------------------------------------------------------
		case "right":
			for(let el of currentFigure) {	
				if(+el[el.length-1] == 0) {
					sound("fall.wav");
					return false;
				}	
				for(let frozBox of froozenBoxes()) {	
					if((Math.round((+el+0.1)*10)/10 == +frozBox && String(+el+1).length === frozBox.length) || Math.round((+el+0.1)*10)/10 + ".10" == frozBox) {
						sound("fall.wav");
						return false;	
					}
				}
			}	
			return true;	
		// --------------------------------------------------------------------------------------------------

		case "left":
			for(let el of currentFigure) {			
				if(+el[el.length-1] === 1) {
					sound("fall.wav");
					return false;
				}
				for(let frozBox of froozenBoxes()) {
					if(Math.round((+el-0.1)*10)/10 === +frozBox && String(+el+1).length === frozBox.length){
						sound("fall.wav");
						return false;
					}
				}
			}
			return true;
	}
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
					if (+box.dataset.state !== 2 && box.innerText == el) {
						box.dataset.state = 0;
						break;
					}
				}
			}
			for(let el of rightCoords) {
				for(let box of allBoxes) {
					if (!box.dataset.state !== 2 && box.innerText == el) {
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

				if(el.slice(index+1).length === 1) {
					el.splice(index+1, 1, +el[index+1]-1);
				}
				else {
					el.splice(index+1, 2, +el.slice(index+1).join('')-1);
				}
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

document.body.onkeydown = function(e) {
	let activeBoxes = [];

	for(let box of allBoxes) {
		if(+box.dataset.state == 1) activeBoxes.push(box.innerText);
	}

	switch (e.which) {
		case 40:
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

		case 37:
			return (canMove(activeBoxes, "left")) ? move("left", activeBoxes) : true;
	
		case 39:
			return (canMove(activeBoxes, "right")) ? move("right", activeBoxes) : true;
	}
}


