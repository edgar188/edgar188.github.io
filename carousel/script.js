"use strict";

const passHandler = side => {
	const left = document.getElementById("left"),
		right = document.getElementById("right"),
		img = document.querySelector("img"),
		imgSource = img["src"].slice(img["src"].indexOf("/img"));

	if (side === "left") {	
		if (imgSource[5] === "1") {
			img.src = "img/8.jpg";
		} else {
			let temp = imgSource.replace(imgSource[5], +imgSource[5]-1);
			img.src = img["src"].replace(imgSource, temp);
		}
	}
	else {
		if (imgSource[5] === "8") {
			img.src = "img/1.jpg";
		} else {
			let temp = imgSource.replace(imgSource[5], +imgSource[5]+1);
			img.src = img["src"].replace(imgSource, temp);
		}
	}
};

let timer;

const getSlideShow = () => {
	const button = document.getElementById("button");
	const buttonSpan = document.getElementById("buttonSpan");
	
	if (buttonSpan.children[0].innerText === "Play") {
		buttonSpan.children[0].innerText = "Stop";
		return timer = setInterval(passHandler, 750);
	}

	buttonSpan.children[0].innerText = "Play";
	return clearInterval(timer);
};


left.onclick = () => {
	return passHandler("left")
};

right.onclick = () => {
	return passHandler();
};

button.onclick = () => {
	return getSlideShow();
};

document.body.onkeypress = e => {
	if (e.which === 32) {
		return getSlideShow();
	}
};

document.querySelector("img").onclick = () => {
	return getSlideShow();
}

