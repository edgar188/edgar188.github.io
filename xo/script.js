window.onload = function() {
	
	var game = document.getElementById('game');

	for (var i = 0; i < 9; i++) {
		game.innerHTML +="<div class='block'></div>";
	}
	var o = document.getElementById('o');
	var x = document.getElementById('x');
	var block = document.getElementsByClassName("block");
	
	//=================================== o.onclick ====================================
	o.onclick = function(e) {

		o.style.display = 'none';
		x.style.display = 'none';
		game.style.display = 'block';

		game.onclick = function(e) {
		if (e.target.className == 'block') {
			if (!e.target.innerHTML) {
					e.target.innerHTML = 'O';
					randomX();
				}
			checkWinner();
			}
		}
	}
	//=================================== x.onclick =====================================
	x.onclick = function(e) {

		o.style.display = 'none';
		x.style.display = 'none';
		game.style.display = 'block';

		game.onclick = function(e) {
		if (e.target.className == 'block') {
			if (!e.target.innerHTML) {
					e.target.innerHTML = 'X';
					randomO();
				}
			checkWinner();
			}
		}
	}
	// ================================== mouse down-up ==================================
	game.onmousedown = function(e) {
		e.target.style.background='black';
		e.target.style.color='white';
	}
	game.onmouseup = function(e) {
		e.target.style.background='white';
		e.target.style.color='black';
	}
	// ================================ randomX() ========================================
	function randomX() {

	r = Math.floor(Math.random()*9);

	try{
		if (!block[r].innerHTML) {
			block[r].innerHTML = 'X';
		}else if(block[r].innerHTML){
			randomX();
		}
	}	catch(e){
			return true;
		}
	}	
	// ================================  randomO()  ============================================
	function randomO() {

	r = Math.floor(Math.random()*9);
	try{
		if (!block[r].innerHTML) {
			block[r].innerHTML = 'O';
		}else if(block[r].innerHTML){
			randomO();
		}
	}	catch(e){
			return true;
		}
	}	
	//============================= checkWinner() ===============================================
	function checkWinner() {

		blocks = document.getElementsByClassName("block");

		// --------------------------------- If win's O(zero) ! ---------------------------------

		if(blocks[0].innerHTML =='O' && blocks[1].innerHTML =='O' && blocks[2].innerHTML =='O'){

			blocks[0].style.background = 'black';
			blocks[0].style.color = 'white';
			blocks[1].style.background = 'black';
			blocks[1].style.color = 'white';
			blocks[2].style.background = 'black';
			blocks[2].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[3].innerHTML =='O' && blocks[4].innerHTML =='O' && blocks[5].innerHTML =='O'){
			blocks[3].style.background = 'black';
			blocks[3].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[5].style.background = 'black';
			blocks[5].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[6].innerHTML =='O' && blocks[7].innerHTML =='O' && blocks[8].innerHTML =='O'){
			blocks[6].style.background = 'black';
			blocks[6].style.color = 'white';
			blocks[7].style.background = 'black';
			blocks[7].style.color = 'white';
			blocks[8].style.background = 'black';
			blocks[8].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[0].innerHTML =='O' && blocks[3].innerHTML =='O' && blocks[6].innerHTML =='O'){
			blocks[0].style.background = 'black';
			blocks[0].style.color = 'white';
			blocks[3].style.background = 'black';
			blocks[3].style.color = 'white';
			blocks[6].style.background = 'black';
			blocks[6].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[1].innerHTML =='O' && blocks[4].innerHTML =='O' && blocks[7].innerHTML =='O'){
			blocks[1].style.background = 'black';
			blocks[1].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[7].style.background = 'black';
			blocks[7].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[2].innerHTML =='O' && blocks[5].innerHTML =='O' && blocks[8].innerHTML =='O'){
			blocks[2].style.background = 'black';
			blocks[2].style.color = 'white';
			blocks[5].style.background = 'black';
			blocks[5].style.color = 'white';
			blocks[8].style.background = 'black';
			blocks[8].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[0].innerHTML =='O' && blocks[4].innerHTML =='O' && blocks[8].innerHTML =='O'){
			blocks[0].style.background = 'black';
			blocks[0].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[8].style.background = 'black';
			blocks[8].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}
		else if(blocks[2].innerHTML =='O' && blocks[4].innerHTML =='O' && blocks[6].innerHTML =='O'){
			blocks[2].style.background = 'black';
			blocks[2].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[6].style.background = 'black';
			blocks[6].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли нолики !');
				location.reload();
			},50);
		}


		//--------------------------------- If win's X !----------------------------------------------

		else if(blocks[0].innerHTML =='X' && blocks[1].innerHTML =='X' && blocks[2].innerHTML =='X'){
			blocks[0].style.background = 'black';
			blocks[0].style.color = 'white';
			blocks[1].style.background = 'black';
			blocks[1].style.color = 'white';
			blocks[2].style.background = 'black';
			blocks[2].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[3].innerHTML =='X' && blocks[4].innerHTML =='X' && blocks[5].innerHTML =='X'){
			blocks[3].style.background = 'black';
			blocks[3].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[5].style.background = 'black';
			blocks[5].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[6].innerHTML =='X' && blocks[7].innerHTML =='X' && blocks[8].innerHTML =='X'){
			blocks[6].style.background = 'black';
			blocks[6].style.color = 'white';
			blocks[7].style.background = 'black';
			blocks[7].style.color = 'white';
			blocks[8].style.background = 'black';
			blocks[8].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[0].innerHTML =='X' && blocks[3].innerHTML =='X' && blocks[6].innerHTML =='X'){
			blocks[0].style.background = 'black';
			blocks[0].style.color = 'white';
			blocks[3].style.background = 'black';
			blocks[3].style.color = 'white';
			blocks[6].style.background = 'black';
			blocks[6].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[1].innerHTML =='X' && blocks[4].innerHTML =='X' && blocks[7].innerHTML =='X'){
			blocks[1].style.background = 'black';
			blocks[1].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[7].style.background = 'black';
			blocks[7].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[2].innerHTML =='X' && blocks[5].innerHTML =='X' && blocks[8].innerHTML =='X'){
			blocks[2].style.background = 'black';
			blocks[2].style.color = 'white';
			blocks[5].style.background = 'black';
			blocks[5].style.color = 'white';
			blocks[8].style.background = 'black';
			blocks[8].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[0].innerHTML =='X' && blocks[4].innerHTML =='X' && blocks[8].innerHTML =='X'){
			blocks[0].style.background = 'black';
			blocks[0].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[8].style.background = 'black';
			blocks[8].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}
		else if(blocks[2].innerHTML =='X' && blocks[4].innerHTML =='X' && blocks[6].innerHTML =='X'){
			blocks[2].style.background = 'black';
			blocks[2].style.color = 'white';
			blocks[4].style.background = 'black';
			blocks[4].style.color = 'white';
			blocks[6].style.background = 'black';
			blocks[6].style.color = 'white';
			setTimeout(function() {
				alert('Выгрыли крестики !');
				location.reload();
			},50);
		}

		//--------------------------------- Draw (no one win's)! --------------------------------- 
		
		else if(blocks[0].innerHTML !='' && blocks[1].innerHTML !=''&& blocks[2].innerHTML !=''&& 
				blocks[3].innerHTML !='' && blocks[4].innerHTML !=''&& blocks[5].innerHTML !='' && 
				blocks[6].innerHTML !='' && blocks[7].innerHTML !='' && blocks[8].innerHTML !='') {
				setTimeout(function() {
				alert('Ничья !');
				location.reload();
			});
		}
	}
}