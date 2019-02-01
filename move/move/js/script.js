
function getScroll(w) {

	w = w || window;

	if (w.pageXOffset != null) {
		return {
			x: pageXOffset,
			y: pageYOffset
		}
	}
}



function drag(el,event) {
	
	var scroll = getScroll();
	
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;

	var elX = el.offsetLeft;
	var elY = el.offsetTop;

	var deltaX = startX - elX;
	var deltaY = startY - elY;

	if (document.addEventListener) {
		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',upHandler,true);
		document.addEventListener('contextmenu',contextHandler,true);
		
	}

	if (event.stopPropagation) {
		event.stopPropagation();
	}
	if (event.preventDefault) {
		event.preventDefault();
	}

	function moveHandler(e) {

		var scroll = getScroll();

		el.style.left = (e.clientX + scroll.x - deltaX) + 'px';
		el.style.top = (e.clientY + scroll.y - deltaY) + 'px';

		if (e.stopPropagation) {
			e.stopPropagation();
		}
	}

	function upHandler(e) {

		if (document.removeEventListener){
			document.removeEventListener('mousemove',moveHandler,true);
			document.removeEventListener('mouseup',upHandler,true);

		}

		if (e.stopPropagation) {
			e.stopPropagation();
		}
	}

	function contextHandler(e) {
		e.preventDefault();
	}




}
