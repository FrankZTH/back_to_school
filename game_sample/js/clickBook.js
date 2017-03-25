var clickBook = function() {
	this.load = function() {
		this.book = new Framework.Sprite(define.imagePath + 'book.png');
		this.book.position={
			x: Framework.Game.getCanvasWidth() / 2,
			y: Framework.Game.getCanvasHeight() / 2
		}
		this.book.rotation = 0;
    this.book.scale=3;
		this.position = {
			x:100,
			y:100
		}
		this.rotation = 0;
		
	};

	this.initialize = function(){

	};

	this.update = function() {

	};

	this.draw = function(ctx){
		this.book.draw(ctx);
	};

	this.mousedown = function(e){
    	console.log(e);
	};
};
