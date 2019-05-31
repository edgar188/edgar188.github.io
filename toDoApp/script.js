"use strict";

const myInp = document.getElementsByTagName("input")[0],
	  myBut = document.getElementsByTagName("button")[0];

function adder () {
	let text = myInp.value,
		add = document.createElement("div"),
		span = document.createElement("span"),
		parag = document.createElement("p"),
		msg = document.createTextNode("X");

	add.className = "msgDiv";
	span.className = "myClose";
	span.appendChild(msg);
	parag.appendChild(document.createTextNode(myInp.value));
	add.appendChild(span);
	add.appendChild(document.createElement("br"));
	parag.className = "msgParag";
	add.appendChild(parag);
	mainDiv.appendChild(add);
	myInp.value = "";
}


myBut.onclick = e => {
	adder();
}

myBut.onmousedown = e => {
	e.target.style.background = "#fff";
	e.target.style.color = '#111';
}
myBut.onmouseup = e => {
	e.target.style.background = "#0d1214a3";
	e.target.style.color = "#fff"
}


myInp.onkeypress = e => {
	if (e.which === 13) {
		adder();
	}
} 

document.addEventListener("click", e => {
	if (e.target.className === "myClose") {
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






