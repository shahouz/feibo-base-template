//
//
// Created on 2015-03-05
// 飞博共创 基础页面, 通用类扩展
// author vqd
// Updated on 2015-03-05
//

(function(window, undefined) {

	//使document指向参数window里的document
	var document = window.document, 
		location = document.location;

	var vqd={
		// fn:		类型判断
		// param:	{any} o 判断对象
		// return:	{string} 返回判断字符串
		//			可选字符串有:"Boolean","Number","String","Function","Array","Date","RegExp","Object","undefined",等
		type:function(o){
			//"Boolean","Number","String","Function","Array","Date","RegExp","Object","undefined"
			var t=Object.prototype.toString.call(o),l=t.length;
			return o==null?String(o):t.slice(8,l-1);
		},

		// fn:		删除左右两端的空格
		// param:	{string} str 要处理的字符串
		// return:	{string} 返回处理好的字符串
		trim:function(str){
			 return str.replace(/(^\s+|\s+$)/g,"");
		},

		// scrolltop
		wScrollTop:function(v){
			var d = document;
			if(vqd.type(v)!="undefined"){
				window.pageYOffset=d.documentElement.scrollTop=d.body.scrollTop=v;
				return v;
			}
			return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
		},

		// scrollleft
		wScrollLeft:function(){
			var d = document;
			return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
		},

		// fn:		scrollWidth
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} scrollWidth
		wScrollWidth:function(r){
			var d = document;
			if(!this._scrollWidth || r){
				this._scrollWidth=d.documentElement.scrollWidth;
			}
			return this._scrollWidth;
		},
		// fn:		scrollHeight
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} scrollHeight
		wScrollHeight:function(r){
			var d = document;
			if(!this._scrollHeight || r){
				this._scrollHeight=d.documentElement.scrollHeight;
			}
			return this._scrollHeight;
		},

		// fn:		clientWidth
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} clientWidth
		wClientWidth:function(r){
			var d = document;
			if(!this._clientWidth || r){
				this._clientWidth=d.documentElement.clientWidth;
			}
			return this._clientWidth;
		},

		// fn:		clientHeight
		// param:	{boolean} r 是否刷新当前数据
		// return:	{number} clientHeight
		wClientHeight:function(r){
			var d = document;
			if(!vqd._clientHeight || r){
				vqd._clientHeight=window.innerHeight || d.documentElement.clientHeight;
			}
			return vqd._clientHeight;
		},
		easeOut:function(t,b,c,d){
			return -c*(t/=d)*(t-2)+b;
		},
		anScroll:function(r,fnBefore,fnAfter){
			fnBefore && fnBefore();
			var b=vqd.wScrollTop(),c=r-vqd.wScrollTop(),d=40,t=0;
			var run=function(){
				vqd.wScrollTop(Math.ceil(vqd.easeOut(t,b,c,d)));
				if(t<d){t++;setTimeout(run,10);}
			};
			run();
		},
		//Create a cookie with the given name and value and other optional parameters.
		//
		//@example vqd.cookie('the_cookie', 'the_value');
		//@desc Set the value of a cookie.
		//@example vqd.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
		//@desc Create a cookie with all available options.
		//@example vqd.cookie('the_cookie', 'the_value');
		//@desc Create a session cookie.
		//@example vqd.cookie('the_cookie', null);
		//@desc Delete a cookie by passing null as value.
		//
		//@param String name The name of the cookie.
		//@param String value The value of the cookie.
		//@param Object options An object literal containing key/value pairs to provide optional cookie attributes.
		//@option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
		//                            If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
		//                            If set to null or omitted, the cookie will be a session cookie and will not be retained
		//                            when the the browser exits.
		//@option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
		//@option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
		//@option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
		//                       require a secure protocol (like HTTPS).
		cookie : function(name, value, options) {
			if (typeof value != 'undefined') { // name and value given, set cookie
				options = options || {};
				if (value === null) {
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if (typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					} else {
						date = options.expires;
					}
					
					expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
				}
				var path = options.path ? '; path=' + options.path : '';
				var domain = options.domain ? '; domain=' + options.domain : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');

			} else { // only name given, get cookie
				var cookieValue = null;
				var len=parseInt(name.length+1);
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i].replace(/(^\s+|\s+$)/g,"");
						// Does this cookie string begin with the name we want?
						//alert(cookie.substring(0, len)+"对"+len+"比"+(name + '='));
						if (cookie.substring(0,len) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(len));
							break;
						}
					}
				}
				return cookieValue;
			}
		},
		//本地存储get
		getItem:function(key){
			if(localStorage.length){
				return localStorage.getItem(key);
			}else{
				return vqd.cookie(key);
			}
		},
		//本地存储set
		setItem:function(key,val,opts){
			if(localStorage.length){
				if(!val){
					localStorage.removeItem(key);
				}else{
					localStorage.setItem(key,val);
				}
			}else{
				vqd.cookie(key,val,opts);
			}
		},	
		//字符串相似度 levenshtein Distance算法
		//first_str:参考字符串
		//secend_str:需要匹配的字符串
		//percentNum:返回的数据，0-1，小数点后4位
		LD_str:function(first_str, secend_str){
			// levenshtein distance 算法
			function Levenshtein_Distance(s,t){
				var n=s.length;// length of s
				var m=t.length;// length of t
				var d=[];// matrix
				var i;// iterates through s
				var j;// iterates through t
				var s_i;// ith character of s
				var t_j;// jth character of t
				var cost;// cost
				if (n == 0) return m;
				if (m == 0) return n;
				for (i = 0; i <= n; i++) {
					d[i]=[];
					d[i][0] = i;
				};
				for (j = 0; j <= m; j++) {
					d[0][j] = j;
				};
				for (i = 1; i <= n; i++) {
					s_i = s.charAt (i-1);
					// Step 4
					for (j = 1; j <= m; j++) {
						t_j = t.charAt (j-1);
						if (s_i == t_j) {
							cost = 0;
						}else{
							cost = 1;
						};
						d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
				 	};
				};
				return d[n][m];
			}
			//求三个数字中的最小值
			function Minimum(a,b,c){
				return a<b?(a<c?a:c):(b<c?b:c);
			}

			var length_str = first_str.length>secend_str.length?first_str.length:secend_str.length;
			var num = Levenshtein_Distance(first_str,secend_str);
			var percentNum = (1-num/length_str).toFixed(4)
			return percentNum;
		},
		//获取设备类型 及 浏览器版本
		versions:function(){
			var u = navigator.userAgent, 
				app = navigator.appVersion;
			return {         
				//移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		//获取浏览器语言
		language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	window.vqd=vqd;
})(window);







(function (doc, window) {
    var docEl = doc.documentElement,
     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = (20 * (clientWidth / 320)) > 40 ? 40 + "px" : (20 * (clientWidth / 320)) + 'px';
            },
            anime =window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
                    function(e){
                        return setTimeout(e,16.67);
            };
    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

