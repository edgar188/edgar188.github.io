"use strict";

const passHandler = side => {
	const left = document.getElementById("left"),
		right = document.getElementById("right"),
		img = document.querySelector("img"),
		imgSource = img["src"].slice(img["src"].indexOf("/img/"));
	
	let arr = [
	"/img/1.jpg",
	"/img/2.jpg",
	"/img/3.jpg",
	"/img/4.jpg",
	"/img/5.jpg",
	"/img/6.jpg",
	"/img/7.jpg",
	"/img/8.jpg",
	"/img/9.png",
	"/img/10.png"
	];

	if (side === "left") {	
		if (imgSource === arr[0]) {
			img.src = img["src"].replace(imgSource, arr[arr.length-1]);
		} else {
			let temp = arr.indexOf(imgSource);
			img.src = img["src"].replace(imgSource, arr[temp-1]);
		}
	}
	else {
		if (imgSource === arr[arr.length-1]) {
			img.src = img["src"].replace(imgSource, arr[0]);
		} else {
			let temp = arr.indexOf(imgSource);
			img.src = img["src"].replace(imgSource, arr[temp+1]);
		}
	}
};

let timer;
const getSlideShow = () => {
	const button = document.getElementById("button"),
	buttonSpan = document.getElementById("buttonSpan");
	
	if (buttonSpan.children[0].innerText === "Play") {
		buttonSpan.children[0].innerText = "Stop";
		return timer = setInterval(passHandler, 1000);
	}

	buttonSpan.children[0].innerText = "Play";
	clearInterval(timer);
	return timer = null;
};


left.onclick = () => passHandler("left")

right.onclick = () => passHandler();

button.onclick = () =>  getSlideShow();

document.body.onkeypress = e => {
	if (e.which === 32) return getSlideShow();
};

document.querySelector("img").onclick = () => getSlideShow();





