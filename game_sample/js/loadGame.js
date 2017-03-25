//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
(function(){

    var  importJS = function(jsConf, src, lookFor) {
        var headID = document.getElementsByTagName("head")[0];
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if(jsConf.length > 0) {
                importJS(jsConf, lookFor);
            }else
			{
				loadGameEnd = true;
			}
        });
    }

    var wait_for_script_load = function(jsConf, callback) {
        var interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = '';
            }

            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                    clearInterval(interval);
                    callback();
                }
            }, 50);
    }
    var listScript =
    [
        { src: 'game_sample/js/define.js', lookFor: 'define' },
        { src: 'game_sample/js/clickBook.js', loofFor: 'clickBook'},
        { src: 'game_sample/js/downArrow.js', loofFor: 'downArrow'},
        { src: 'game_sample/js/Book.js', loofFor: 'Book'},
        { src: 'game_sample/js/myMenu.js', lookFor: 'MyMenu' },
		    { src: 'game_sample/js/Practice.js', loofFor: 'Practice'},
        { src: 'game_sample/js/myGameLevel1.js', lookFor: 'MyGame' },
        { src: 'game_sample/js/office.js', lookFor: 'office'},
        { src: 'game_sample/js/mainGame.js'}
    ]

    importJS(listScript);

})();
