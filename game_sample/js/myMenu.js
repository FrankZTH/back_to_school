var MyMenu = Framework.exClass(Framework.GameMainMenu , {
	//初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        ctx.font ='90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';  //Loading%數顏色
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
    },

	load: function(){
		//Animation Sprite會用到的圖片資源
        var photoLink =
        [
            define.imagePath + 'NTUT1.png'
        ];

        this.scrollBar = new Framework.Sprite(define.imagePath + 'scrollBar.png');
        this.rightArrow = new Framework.Sprite(define.imagePath + 'rightArrow.png');
        this.photo = new Framework.AnimationSprite({url: photoLink});

		this.isTouchArrow = false;
        this.previousTouch = { x: 0, y: 0 };
        this.currentTouch = { x: 0, y: 0 };

        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
        this.center = new Framework.Scene();  //背景圖中心
        this.center.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };

        //由於scrollBar將會被attach到this.center上
        //故x設為0, 表示x也是要正中心

        this.scrollBar.position = {
            x: Framework.Game.getCanvasWidth() / 2 - 10,
            y: Framework.Game.getCanvasHeight() / 4 * 3.5
        };

        this.photo.scale = 0.7;
        this.photo.position = {
            x: 0,
            y: 0
        };

        this.audio = new Framework.Audio({
            song1:{
                mp3: define.musicPath + 'Scared.mp3'
            }
        });

        this.audio.play({name: 'song1', loop: true});

        this.rightArrow.scale = 0.15;
        this.rightArrow.position = {
            x: Framework.Game.getCanvasWidth() / 2 - 400,
            y: Framework.Game.getCanvasHeight() / 4 * 3.5
        };
        this.center.attach(this.photo);
        this.rootScene.attach(this.center);
        this.rootScene.attach(this.scrollBar);
        this.rootScene.attach(this.rightArrow);

        this.photo.start();

	},

    initialize: function() {

    },

    update:function(){
        this.rootScene.update();
        this.scrollBar.update();
    },

    draw: function(parentCtx) {
        this.rootScene.draw(parentCtx);
    },

    mouseup: function(e) {
        this.isTouchArrow = false;
    },

    mousedown: function(e) {
        if (e) {
            console.log(e.x, e.y);
        }
        this.previousTouch = { x: e.x, y: e.y };
        if (this.previousTouch.x > this.rightArrow.upperLeft.x && this.previousTouch.x < this.rightArrow.upperRight.x && this.previousTouch.y > this.rightArrow.upperLeft.y && this.previousTouch.y < this.rightArrow.lowerLeft.y) {
            this.isTouchArrow = true;
        }
    },

    mousemove: function(e) {
        if (this.isTouchArrow) {
            this.currentTouch = { x: e.x, y: e.y };
            if (this.currentTouch.x > this.previousTouch.x && this.currentTouch.y < this.rightArrow.lowerLeft.y && this.currentTouch.y > this.rightArrow.upperLeft.y) {
                //當arrow被Touch到時, 會跟隨著觸控的位置移動
                this.rightArrow.position.x = this.rightArrow.position.x + this.currentTouch.x - this.previousTouch.x
                if(this.currentTouch.x > Framework.Game.getCanvasWidth() - this.rightArrow.width - 150) { //改變拉條長度
                    //當要換關時, 可以呼叫goToNextLevel, goToPreviousLevel, goToLevel(levelName)
                    this.audio.pauseAll();
                    Framework.Game.goToNextLevel();
                }
            }
       }
       this.previousTouch = this.currentTouch;
    },

    mouseup: function(e) {
        this.isTouchArrow = false;
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.mousedown({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },

    touchend: function (e) {
        this.mouseup();
    },

    touchmove: function (e) {
        this.mousemove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
});
