function getZombie() {
	var zombie = {
		zombies : [],
		zombieIndex : 0,
		killed : function(obj) {
			$('#' + obj.id).addClass('dead');
			if(bob.faceingRight) {
				$('#' + obj.id).animate({
					borderSpacing : +90
				}, {
					step : function(now, fx) {
						$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
						$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
						$(this).css('transform', 'rotate(' + now + 'deg)');
					},
					duration : 'slow'
				}, 'linear');
			} else {
				$('#' + obj.id).animate({
					borderSpacing : -90
				}, {
					step : function(now, fx) {
						$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
						$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
						$(this).css('transform', 'rotate(' + now + 'deg)');
					},
					duration : 'slow'
				}, 'linear');
			}
			setTimeout(function() {
				$('#' + obj.id).fadeOut(4000);
			}, 3000);
			bob.killCount++;
			if(!(bob.killCount % 100)) {
				$('#message').html('<p>You Have Killed ' + bob.killCount + ' Zombies!</p>').show();
				setTimeout(function() {
					$('#message').fadeOut();
				}, 3000);
			}
		},
		spawnZombie : function() {
			setTimeout(function() {
				zombie.zombieIndex++;
				$('#gameArea').append('<div class="zombie" id="zombie' + zombie.zombieIndex + '"></div>');
				if(!Math.floor(Math.random() * 10)) {
					var zombieType = "runner";
					var zombieSpeed = 5;
				} else {
					var zombieType = "normal";
					var zombieSpeed = 2;
				}
				if(zombie.zombieIndex > 0) {
					if(Math.floor(Math.random() * 2)) {
						zombie.zombies.push({
							id : "zombie" + zombie.zombieIndex,
							xpos : 1080,
							faceingRight : false,
							zombieTurnIndex : 0,
							dead : false,
							type : zombieType,
							speed : zombieSpeed
						});

					} else {
						zombie.zombies.push({
							id : "zombie" + zombie.zombieIndex,
							xpos : -140,
							faceingRight : true,
							zombieTurnIndex : 0,
							dead : false,
							type : zombieType,
							speed : zombieSpeed
						});
					}
				} else {
					zombie.zombies.push({
						id : "zombie" + zombie.zombieIndex,
						xpos : 1000,
						faceingRight : false,
						zombieTurnIndex : 0,
						dead : false
					});
				}
				if(bob.zombieRate > 500) {
					bob.zombieRate -= 100;
				}
				if(zombie.zombieIndex < 300) {
					zombie.spawnZombie();
				}
			}, (Math.random() * bob.zombieRate));
		}
	};

	return zombie;
};