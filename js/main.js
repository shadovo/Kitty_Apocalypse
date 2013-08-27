document.addEventListener('DOMContentLoaded', function() {
	var bob = getBob();
	var zombie = getZombie();
	zombie.spawnZombie();
	var animate = setInterval(function() {
		if(keyEnum.leftKey && !keyEnum.rightKey) {
			if($('#bob').attr("class") == "none") {
				bob.xpos -= 80;
				$('#bob').attr("class", "flip-horizontal");
			}
			if(bob.xpos >= 16) {
				bob.xpos -= 16;
			}
		} else if(keyEnum.rightKey && !keyEnum.leftKey) {
			if($('#bob').attr("class") == "flip-horizontal") {
				bob.xpos += 80;
				$('#bob').attr("class", "none");
			}
			if(bob.xpos <= 904) {
				bob.xpos += 16;
			}
		}
		if(keyEnum.upKey) {
			bob.jump();
		}
		if(bob.swinging) {
			if(bob.energy > 2) {
				bob.energy -= 3;
			} else {
				bob.endSwing();
			}
		} else {
			if(bob.energy < 300) {
				bob.energy++;
			}
		}
		$.each(zombie.zombies, function(i, obj) {
			if(!obj.dead) {
				if((bob.ypos > 260) && (((bob.faceingRight) && ((obj.xpos < bob.xpos + 80 && obj.xpos > bob.xpos) || (obj.xpos + 80 > bob.xpos && obj.xpos < bob.xpos)))) || ((!bob.faceingRight) && (obj.xpos < (bob.xpos + 160) && obj.xpos > (bob.xpos + 80)) || ((obj.xpos + 80) > (bob.xpos + 80) && (obj.xpos + 80) < bob.xpos + 160))) {
					bob.life--;
				}
				if(bob.life <= 0) {
					window.clearInterval(animate);
					$('#message').html("<p id='youreDead'>You Have Died <br/>You Killed A Total Of " + bob.killCount + " Zombies</p>").show();
				}
				if(bob.swinging && bob.ypos > 280 && ((bob.faceingRight && (bob.xpos + 168 > obj.xpos && bob.xpos + 0 < obj.xpos)) || (!bob.faceingRight && bob.xpos < obj.xpos + 80 && bob.xpos > obj.xpos + 0))) {
					obj.dead = true;
					zombie.killed(obj);
				} else if(!obj.faceingRight && (obj.xpos < bob.xpos + 30)) {
					setTimeout(function() {
						obj.faceingRight = true;
					}, 300);
				} else if(obj.faceingRight && (obj.xpos > bob.xpos + 80)) {
					setTimeout(function() {
						obj.faceingRight = false;
					}, 300);
				}
				if(obj.faceingRight) {
					obj.xpos += obj.speed;
				} else if(!obj.faceingRight) {
					obj.xpos -= obj.speed;
				}

				$(('#' + obj.id)).css('left', obj.xpos + 'px');
			}
		});
		$('#healthLvl').css('width', bob.life + '%');
		$('#chainsawEnergyLvl').css('width', bob.energy / 3 + '%');
		$('#bob').css('left', bob.xpos + 'px');
		$('#bob').css('top', bob.ypos + 'px');
	}, 16);
});
