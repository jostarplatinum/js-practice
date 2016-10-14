/**
 * DomReady,在文档创建时,就访问dom元素.比window.onload要快很多.绑定需要执行的函数.
 * @param  {Function} fn 需要执行的函数
 * @return {执行}      在dom节点创建时,同时执行,window.onload等到节点全部创建完毕才执行
 * myReady(function(){});
 */
function myReady (fn) {
    // 对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn, false);
    } else {
        IEContentLoaded(fn);
    }
    // IE模拟DOMContentLoaded
    function IEContentLoaded (fn) {
        var d = window.document;
        var done = false;

        // 只执行一次用户的回调函数init()&#xe603;
        var init = function () {
            if (!done) {
                done = true;
                fn();
            }
        };
        (function () {
            try {
                // DOM树未创建完之前调用doScroll会抛出错误
                d.documentElement.doScroll('left');
            } catch (e) {
                // 延迟再试一次~
                setTimeout(arguments.callee, 50);
                return;
            }
            // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
            init();
        })();

        // 监听document的加载状态
        d.onreadystatechange = function () {
            // 如果用户是在domReady之后绑定的函数，就立马执行
            if (d.readyState === 'complete') {
                d.onreadystatechange = null;
                init();
            }
        };
    }
}

/**
 *  显示隐藏函数,如果是显示就隐藏,是隐藏就显示
 * @param {object} obj 需要在点击或hover后实现点击显示隐藏.的对象
 */
function showHide (obj) {
    var objDisplay = obj.style.display;
    if (objDisplay == 'block') {
        obj.style.display = 'none';
    } else {
        obj.style.display = 'block';

    }
}
// 侧边导航栏
myReady(function(){
	var wrap = document.getElementById('wrap');
	var dt = wrap.getElementsByTagName("dt");
	for(var i=0;i<dt.length;i++){
		dt[i].onclick=function(){
			var dl = this.parentNode;
			var dd = dl.getElementsByTagName("dd");
			for(var j=0;j<dd.length;j++){
				showHide(dd[j]);
			}
		}
	}
});