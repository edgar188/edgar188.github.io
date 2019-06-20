(function createTetrisWorld() {	
	let wrapper = document.getElementById("wrapper");	
	for(let y = 1; y <= 20; y++) {	
		let row = document.createElement("div");	
		row.className = "row";	
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
// tetrominoes	
const allBoxes = document.getElementsByClassName("box");	

 let figure = [1.5, 1.6, 2.5, 2.6];	
function start() {	
	for(let el of allBoxes) {	
		for(let coords of figure) {	
			if (coords == el.innerText) {	
				el.setAttribute("data-state", 1);	
			}	
		}	
	}	

 	let t = setInterval(function() {	
		let activeBoxes = [];	

 	for(let box of allBoxes) {	
		if(box.getAttribute("data-state") == 1) {	
			activeBoxes.push(box.innerText);	
		}	
	}	
	if(canMove(activeBoxes, "down")) {	
		move("down", activeBoxes);	
	} 	
	else {	
		for(let el of allBoxes) {	
			for(let box of activeBoxes) {	
				if(el.innerText == box) {	
					el.setAttribute("data-state", 2);	
				}	
			}	
		}	
			}	
	}, 1000);	
}	

function froozenBoxes() {	
	let result = [];	
	for(let box of allBoxes) {	
		if (box.getAttribute("data-state") == 2) {	
			result.push(box.innerText);	
		}	
	}	
	return result;	
}	

function canMove(currentFigure, to) {	
	switch (to) {	
		case "right":	
			for(let el of currentFigure) {	
				if(+el[el.length-1] == 0) return false;	
				for(let frozBox of froozenBoxes()) {	
					if(Math.round((+el+0.1)*10)/10 === +frozBox && String(+el+1).length === frozBox.length) return false;	
				}	
			}	
			return true;	

 		case "left":	
			for(let el of currentFigure) {				
				if(+el[el.length-1] == 1) return false;	
				for(let frozBox of froozenBoxes()) {	
					if(Math.round((+el-0.1)*10)/10 === +frozBox && String(+el+1).length === frozBox.length) return false;	
				}	
			}	
			return true;	

 		case "down":	
			for(let el of currentFigure) {	
				if (+el > 20) return false;	

 				for(let frozBox of froozenBoxes()) {	
					if (+el+1 === +frozBox && String(+el+1)[el.length-1] === frozBox[frozBox.length-1]) {	
						for(let currF of currentFigure) {	
							for(let box of allBoxes) {	
								if(+box.innerText === +currF && box[box.length-1] === currF[currF.length-1] && String(+el+1).length === frozBox.length) {	
									box.setAttribute("data-state", 2);	
								}	
							}	
						}	
						return false;	
					}	
				}	
			}	
	}	
}	

function move(to, arr) {
	switch (to) {	
		case "down":	
			let downCoords = [];	

 			for(let el of arr) {	
				let first = el.slice(0, el.indexOf("."));	
				downCoords.push(el.replace(first, +first + 1));	
			}	
			for(let box of allBoxes) {	
				for(let el of arr) {	
					if (box.innerText == el && box.getAttribute("data-state") !== 2) {	
						box.setAttribute("data-state", 0);	
					}	
				}	
				for(let el of downCoords) {	
					if (box.innerText == el  && box.getAttribute("data-state") !== 2) {	
						box.setAttribute("data-state", 1);	
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
			for(let box of allBoxes) {	
				for(let el of arr) {	
					if (box.innerText == el && box.getAttribute("data-state") !== 2) {	
						box.setAttribute("data-state", 0);	
					}	
				}	
				for(let el of rightCoords) {	
					if (box.innerText == el  && box.getAttribute("data-state") !== 2) {	
						box.setAttribute("data-state", 1);	
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
			for(let box of allBoxes) {	
				for(let el of arr) {	
					if (box.innerText == el  && box.getAttribute("data-state") !== 2) {	
						box.setAttribute("data-state", 0);	
					}	
				}	
				for(let el of leftCoords) {	
					if (box.innerText == el  && box.getAttribute("data-state") !== 2) {	
						box.setAttribute("data-state", 1);	
					}	
				}	
			}	
		return;	
	}	
}	


document.body.onkeydown = function(e) {	
	let activeBoxes = [];	

 	for(let box of allBoxes) {	
		if(box.getAttribute("data-state") == 1) {	
			activeBoxes.push(box.innerText);	
		}	
	}	
	switch (e.which) {	
		case 37:	
			if(canMove(activeBoxes, "left")) {	
				move("left", activeBoxes);	
			}	
			break;	

 		case 39:	
			if(canMove(activeBoxes, "right")) {	
				move("right", activeBoxes);	
			}	
			break;	

 		case 40:	
			if(canMove(activeBoxes, "down")) {	
				move("down", activeBoxes);	
			} else {	
				for(let el of allBoxes) {	
					for(let box of activeBoxes) {	
						if(el.innerText == box) {	
							el.setAttribute("data-state", 2);	
						}	
					}	
				}	
			}	
			break;	
	}	
}	










//======================================= sevagir ========================================
// function moveBoxesDown() {
// 	// let boxesData1 = [];
// 	// let boxesDataNode = [];
// 	// for(let box of allBoxes) {
// 	// 	if (box.getAttribute("data-state") == 1) {
// 	// 		boxesData1.push(+box.innerText);
// 	// 		boxesDataNode.push(box);
// 	// 	}
// 	// }
// 	// let max = Math.max(...boxesData1);
// 	// for(let box of allBoxes) {
// 	// 	if(Math.round(((+box.innerText-1)*10))/10 == max && box.getAttribute("data-state") == 0){
// 	// 		for(let box2 of allBoxes) {
// 	// 			for(let el of boxesDataNode) {
// 	// 				if (+el.innerText + 1 == +box2.innerText) {
// 	// 					box2.setAttribute("data-state", 1);
// 	// 					el.setAttribute("data-state", 0);
// 	// 				}
// 	// 			}
// 	// 		}
// 	// 	}
// 	// }
// 	// return;
// 	let boxData1 = [];
// 	let data1boxNodes = [];
// 	for(let box of allBoxes) {
// 		if (box.getAttribute("data-state") == 1) {
// 			boxData1.push(box.innerText);
// 			data1boxNodes.push(box);
// 			box.setAttribute("data-state", 0);
// 		}
// 	}
	
// 	for(let box of allBoxes) {
// 		for(let el of data1boxNodes) {
// 			if(+el.innerText  == Math.round(((+box.innerText-1)*10))/10 
// 				&& box.getAttribute("data-state") == 0) {
// 					box.setAttribute("data-state", 1)
// 			}
// 		}
// 	}
// }







