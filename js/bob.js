function getBob() {
	var bob = document.getElementById('bob');
	bob.life = 100;
	bob.energy = 300;
	bob.jumping = false;
	bob.faceingRight = true;
	bob.xpos = 80;
	bob.ypos = 340;
	bob.zombieRate = 5000;
	bob.swinging = false;
	bob.killCount = 0;
	bob.jump = function() {
		if(!bob.jumping) {
			$('#bob').css("background-image", "url(img/kittyw30.png)");
			bob.jumping = true;
			bob.jumpSeq = 0;
			bob.jumpInterval = setInterval(function() {
				if(bob.jumpSeq == 50) {
					clearInterval(bob.jumpInterval);
				} else if(bob.jumpSeq < 25) {
					bob.ypos -= 14;
				} else {
					bob.ypos += 14;
				}
				bob.jumpSeq++;
			}, 10);
			setTimeout(function() {

				$('#bob').css("background-image", "url(img/kittyw00.png)");
				setTimeout(function() {
					bob.jumping = false
				}, 50);
			}, 550);
		}
	};
	bob.swing = function() {
		if(bob.energy > 5) {
			bob.swinging = true;
			$('#weapon').show();
		}
	};
	bob.endSwing = function() {
		$('#weapon').hide();
		bob.swinging = false;
	}
	return bob;
}