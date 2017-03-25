var Practice = function() {
	this.load = function() {
		this.pic = new Framework.Sprite(define.imagePath + 'character.png');
		this.pic.position={
			x:1200,
			y:500//100會與原本的圖重疊
		}
		this.pic.rotation = 0;
		this.pic.scale = 0.2;
		this.position = {
			x:100,
			y:100
		}
		this.rotation = 0;

	};

	this.initialize = function(){

	};

	this.update = function() {
		this.rootScene.update();
	};

	this.draw = function(ctx){
		this.pic.draw(ctx);
	};
};
