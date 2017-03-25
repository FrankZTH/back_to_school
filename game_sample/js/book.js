var book = function() {
	this.load = function() {
		this.book = new Framework.Sprite(define.imagePath + 'book.png');
		this.book.position={
			x: Framework.Game.getCanvasWidth() / 6.5-10,
			y: Framework.Game.getCanvasHeight() / 4 *3.2 -10
		}
		this.book.rotation = 0;
		this.book.scale=0.4;
		this.book.rotation=-22;

		this.rotation = 0;

	};

	this.initialize = function(){

	};

	this.putinbag = function() {
		this.book.position={
			x:Framework.Game.getCanvasWidth()-100,
			y:Framework.Game.getCanvasHeight()/5
		}
	};
	this.update = function() {
		this.book.position={
		}
	};

	this.draw = function(ctx){
		this.book.draw(ctx);
	};

	this.mousedown= function(e){
		console.log(e);
		if(e.x >= this.book.position.x - 57 && e.x <= this.book.position.x + 57 && e.y >= this.book.position.y - 40 && e.y <= this.book.position.y + 40) {
			this.putinbag();
			this.clickBook = new clickBook();
			this.clickBook.load();
			this.clickBook.draw();
			return 0;
		}
		else {
				return 1;
		}
	};
};
