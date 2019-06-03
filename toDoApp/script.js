"use strict";

const myInp = document.getElementsByTagName("input")[0],
	  myBut = document.getElementsByTagName("button")[0],
	  myButClear = document.getElementsByTagName("button")[1];

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


const addToDo = item => {
	let add = document.createElement("div"),
		span = document.createElement("span"),
		parag = document.createElement("p"),
		msg = document.createTextNode("X"),
		text = item || myInp.value,
		check = item ? true : false; 

	if (text) {
		add.className = "msgDiv";
		span.className = "myClose";
		span.appendChild(msg);
		parag.appendChild(document.createTextNode(text));
		add.appendChild(span);
		add.appendChild(document.createElement("br"));
		parag.className = "msgParag";
		add.appendChild(parag);
		mainDiv.appendChild(add);
		myInp.value = "";

		if (!check) {
			itemsArray.push(text);
  			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}
	else {
		myBut.style.background = "red";
		setTimeout(() => {
			myBut.style.background = "#0d1214a3";
			myBut.style.color = "#fff"; 
		}, 200);
	}
}

data.forEach(item => {
	addToDo(item);
})


myBut.onclick = () => {
	addToDo();
}

myInp.onkeypress = e => {
	if (e.which === 13) {
		addToDo();
	}
} 

myButClear.onclick = () => {
	localStorage.clear();

	for(let el of mainDiv.children) {

		if (el.className === "msgDiv") {
			el.style.display = "none";
		}
	}
}


myBut.onmousedown = e => {
	e.target.style.background = "#fff";
	e.target.style.color = '#111';
}

myButClear.onmousedown = e => {
	e.target.style.background = "#fff";
	e.target.style.color = '#111';
}

myBut.onmouseup = e => {
	e.target.style.background = "#0d1214a3";
	e.target.style.color = "#fff"
}

myButClear.onmouseup = e => {
	e.target.style.background = "#0d1214a3";
	e.target.style.color = "#fff"
}

document.addEventListener("click", e => {
	
	if (e.target.className === "myClose") {
		let value = e.target.parentNode.childNodes[2].innerText,
			arr = JSON.parse(localStorage.getItem("items"));

		arr.splice(arr.indexOf(value), 1);
		localStorage.setItem("items", JSON.stringify(arr));
		e.target.parentNode.style.display = 'none';
	}
	
	if(e.target.className === "msgParag") {

		if (e.target.style.background !== "grey") {
			e.target.parentNode.style.background = "grey";
			e.target.style.background = "grey";
		}
		else {
			e.target.style.background = "#10181E";
			e.target.parentNode.style.background = "#10181E";
		}
	}

	if (e.target.className === "msgDiv") {

		if (e.target.style.background !== "grey") {
			e.target.style.background = 'grey'; 
			e.target.children[1].style.background = "grey";
			e.target.children[2].style.background = "grey";
		}
		else {
			e.target.style.background = '#10181E'; 
			e.target.children[1].style.background = "#10181E";
			e.target.children[2].style.background = "#10181E";
		}
	}
});



