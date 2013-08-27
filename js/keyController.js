var keyEnum = {
	leftKey : 0,
	rightKey : 0,
	upKey : 0
};
document.onkeydown = function(e) {
	if(e.keyCode == 37) {
		keyEnum.leftKey = true;
		bob.faceingRight = false;
	} else if(e.keyCode == 39) {
		keyEnum.rightKey = true;
		bob.faceingRight = true;
	}
	if(e.keyCode == 38) {
		keyEnum.upKey = true;
	}
	if(e.keyCode == 32) {
		bob.swing();
	}
};
document.onkeyup = function(e) {
	if(e.keyCode == 37) {
		keyEnum.leftKey = false;
	} else if(e.keyCode == 39) {
		keyEnum.rightKey = false;
	}
	if(e.keyCode == 38) {
		keyEnum.upKey = false;
	}
	if(e.keyCode == 32) {
		bob.endSwing();
	}
};
