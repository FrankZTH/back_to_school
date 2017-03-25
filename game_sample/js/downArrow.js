var downArrow = function() {
	this.load = function() {
		this.downArrow = new Framework.Sprite(define.imagePath + 'downArrow.png');
    this.downArrow.scale = 0.15;
    this.downArrow.position = {
        x: Framework.Game.getCanvasWidth() / 3 * 2,
        y: Framework.Game.getCanvasHeight() / 4 * 3.5
    };
	};

	this.initialize = function(){

	};

  this.update = function() {

	};

  this.draw = function(ctx){
		this.downArrow.draw(ctx);
	};

	this.mousedown= function(e){
		console.log(e);
    if(e.x >= this.downArrow.position.x-40 && e.x <= this.downArrow.position.x + 40 &&
       e.y >= this.downArrow.position.y-52.5 && e.y <= this.downArrow.position.y + +52.5)
    {
      
      return 0;
    }
		else {
				return 1;
		}
	};
};
