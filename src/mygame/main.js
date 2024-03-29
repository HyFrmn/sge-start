define([
	'sge',
	'./mygamestate',
],
function(sge, MyGameState){
	return {
	    CreateGame : function(width, height, fps){
	        var game = new sge.Game({
	            elem: document.getElementById('game'),
	            width: parseInt(width || 720),
	            height: parseInt(height || 240),
	            fps: parseInt(fps || 30),
	        });
	        
	        var state = game.setGameState(MyGameState);
	        return game;
	    }
	}
})
