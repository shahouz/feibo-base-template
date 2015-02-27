//
//
// Created on 2013-5-30
// 飞博共创 冷笑话3.0 PC版, 通用类扩展
// author ming
// Updated on 2013-6-18
//

(function(window, undefined) {

	//使document指向参数window里的document
	var document = window.document,
		location = document.location;

	var ming={
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
			if(ming.type(v)!="undefined"){
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
			if(!ming._clientHeight || r){
				ming._clientHeight=window.innerHeight || d.documentElement.clientHeight;
			}
			return ming._clientHeight;
		},
		easeOut:function(t,b,c,d){
			return -c*(t/=d)*(t-2)+b;
		},
		anScroll:function(r,fnBefore,fnAfter){
			fnBefore && fnBefore();
			var b=ming.wScrollTop(),c=r-ming.wScrollTop(),d=40,t=0;
			var run=function(){
				ming.wScrollTop(Math.ceil(ming.easeOut(t,b,c,d)));
				if(t<d){t++;setTimeout(run,10);}
			};
			run();
		},
		//Create a cookie with the given name and value and other optional parameters.
		//
		//@example ming.cookie('the_cookie', 'the_value');
		//@desc Set the value of a cookie.
		//@example ming.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
		//@desc Create a cookie with all available options.
		//@example ming.cookie('the_cookie', 'the_value');
		//@desc Create a session cookie.
		//@example ming.cookie('the_cookie', null);
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
				return ming.cookie(key);
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
				ming.cookie(key,val,opts);
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
		//一般提示框
		fullMsg:{
			msg:function(opt){
				return ming.formDialog.dialog(opt,true);
			}
		},
		//表单交互弹框
		formDialog:{
			dialog:function(opt,is_msg){
				var is_msg=typeof is_msg!='undefined'?is_msg:'';
				//对话框基本配置
				var set_dialog={
					isMsg:false,//非提示框
					html: '',//填充html
					tplCont:'',//同步加载的中间填充内容
					dialogWrapperClass: 'popBox',//最外层容器初始样式
					dialogWrapperClassExt:'',//最外层容器层叠样式
					dialogWrapperId: 'popbox',//最外层容器ID
					dialogAllClass:'dialog-all',
					dialogAllId:'dialog-all',
					width:'',//弹出框高度
					height:'',//弹出框宽度
					
					/*顶部标题*/
					titleClass:'popHeader',//样式
					titleId:'dialog-title',//标题id
					titleCont:'',//标题内容
					
					/*中间内容*/
					contentClass: 'popContent',//样式
					tplUrl:'',//填充中间部分的异步加载url
					tplEvent:'',//弹窗tpl异步加载完的扩展事件
					tplParam:'',//弹窗tpl异步加载完的扩展事件携带参数{key:value}
					
					/*底部内容*/
					isBottom:false,//是否加载底部按钮和样式
					footerClass: 'act',//底部样式
					btnOkClass:'btn',//底部确定按钮
					btnNoClass:'canle',//底部取消按钮
					yesFn:'',//确定和取消和关闭按钮绑定事件
					cancelFn:'',
					closeFn:'',
					cancelBtn:true,//是否启用取消按钮
					
					/*其他扩展*/
					isFixed:false,//是否随滚动条滚动(false:随着滚动,true:固定住不随着滚动)
					//set.isFixed==false时以下两个配置方有效
					autoPosition:{xAdd:0,yAdd:0},//自动定位偏移量设置，false表示禁用自动定位
					scrollPosition:true,//scroll触发自动定位开关
					resizePosition:false,//resize触发自动定位开关
					isMask:false,//是否遮罩
					mask:{maskClass:'warm-mask'},//遮罩样式
					isDrag:false,//是否拖曳
					isLogin:false,//是否为登录提醒框
					isMyHtml:false//是否直接往弹窗容器填充自己组装的html内容,替换原来的顶部，中间，底部三层架构
				};
				//提示框基本配置
				if(is_msg){
					var set_msg={
						isMsg:true,//提示框的标志
						dialogWrapperClass:"full-tip",//附加样式名
						dialogWrapperClassExt:"",//附加样式名
						dialogWrapperId:"full-tip",//id名
						dialogAllClass:'flms-box',
						zIndex:false,//z-index，默认不设置
						animate:{//动画配置，false表示禁用动画
							time:1000,//动画时间
							anIn:"fade-in",//入场动画样式
							anOut:"fade-out"//出场动画样式
						},//自动定位偏移量设置，false表示禁用自动定位
						reset:false,//是否重新加载
						hideEndBin:'',//弹窗消失后的加载事件
						scrollPosition:false
					};
					set_msg=$.extend(set_dialog,set_msg);
					set=$.extend(set_msg,opt);
				}else{
					set=$.extend(set_dialog,opt);
				}
				
				//提示框的预加载
				if(set.isMsg){
					var	$fullMsg=$("#"+set.dialogWrapperId);
					if(set.reset){
						$fullMsg.remove();
						$fullMsg=$("#"+set.dialogWrapperId);
					}
					if(!$fullMsg.size()){
						$("body").append('<div id="'+set.dialogWrapperId+'" class="'+set.dialogWrapperClass+' '+set.dialogWrapperClassExt+'" style="left:-100%;top:-100%;'+(set.zIndex?'z-Index:'+set.zIndex:'')+'"><div class="'+set.dialogAllClass+'">'+set.html+'</div></div>');
						$fullMsg=$("#"+set.dialogWrapperId);
					}else{
						set.zIndex && $fullMsg.css({zIndex:set.zIndex});
						set.dialogWrapperClass && $fullMsg.addClass(set.dialogWrapperClass);
						set.dialogWrapperClassExt && $fullMsg.addClass(set.dialogWrapperClassExt);
						set.html && $fullMsg.html('<div class="flms-box">'+set.html+'</div>');
					}
				}
				
				var _return={
						$dialog:set.isMsg?$fullMsg:'',
						width:function(r){
							if(ming.type(r)=='Number'){
								_return._width=r;
							}else if(!_return._width||r){
								_return._width=_return.$dialog.width();
							}
							return _return._width;
						},
						//ming.type(r)=="Number"设置高度
						//ming.type(r)=="Boolean" && r==true刷新获取新高度
						height:function(r){
							if(ming.type(r)=='Number'){
								_return._height=r;
							}else if(typeof _return._height=='undefined'||r){
								_return._height=_return.$dialog.height()?_return.$dialog.height():'';
							}
							return _return._height;
						},
						positionMiddle:function(){

							if(set.isFixed){
								var top=-(_return.height()/2) + set.autoPosition.yAdd;
								var clientHeight=ming.wClientHeight();
								//避免容器超出屏幕溢出
								if(Math.abs(top)>(clientHeight/2)){
									top=-Math.floor(clientHeight/2);
								}
								_return.$dialog.css({
									top:'50%',left:'50%',
									marginLeft:-(_return.width()/2) + set.autoPosition.xAdd ,
									marginTop:top
								});
							}else{
								var top=ming.wClientHeight()/2 - (_return.height()/2 ) +set.autoPosition.yAdd + ming.wScrollTop();
								_return.$dialog.css({
									top:top,left:'50%',
									marginLeft:-(_return.width()/2) + set.autoPosition.xAdd ,
									marginTop:-(_return.height()/2) + set.autoPosition.yAdd
								});
							}
							return _return;
						},
						html:function(txt){
							if(set.isMsg){
								$('.'+set.dialogWrapperClass+' .'+set.dialogAllClass).html(txt);
							}else{
								$('.'+set.dialogWrapperClass+' .'+set.contentClass).html(txt);
							}				
							return _return;
						},
						//window resize绑定事件
						winResize:function(){
							ming.wClientWidth(true);
							ming.wClientHeight(true);
							if(set.resizePosition){
								_return.positionMiddle();
							}
							return _return;
						},
						showBind:false,
						show:function(){
							_return.positionMiddle();
							if(!set.isFixed && set.autoPosition){
								if(set.scrollPosition){
									$(window).on('scroll',_return.positionMiddle);
								}
								if(set.resizePosition){
									$(window).on("onorientationchange" in window?"orientationchange":"resize",_return.winResize);
									//$(window).on("resize",_return.winResize);
								}
							}
							if(set.isMask){_return.mask();}//遮罩层
							if(set.isDrag){//窗体拖曳
								var $title=$("."+set.titleClass);
								$title.css({cursor:'move'});
								$title.on('mousedown',function(e){
									//兼容ie的鼠标down事件捕获，防止鼠标离开点击的容器后无法执行事件
									if($title[0].setCapture){$title[0].setCapture();}
									_return.mouseDown(e);
									$title.on('mousemove',function(e){
										_return.mouseMove(e);
									});
									$title.on('mouseup',function(e){
										$title.off('mousemove');
										$title.off('mouseup');
										if($title[0].releaseCapture){$title[0].releaseCapture();}
									});
								});
							}else{
								$("."+set.titleClass).css({cursor:''});
							}
							_return.showBind && _return.showBind();
							return _return;
						},
						hideBind:false,
						hide:function(){
							if(set.isMsg){//提示框
								if(set.autoPosition && !set.isFixed){//开启非fixed下scroll自动定位功能
									if(set.scrollPosition){
										$(window).off("scroll",_return.positionMiddle);
									}
									if(set.resizePosition){
										$(window).off("resize",_return.winResize);
									}
								}
								//修正为css控制
								$fullMsg.css({top:"-100%",left:"-100%"});
								//加载弹窗小时后的事件 
								if(typeof set.hideEndBin!='undefined'&&typeof set.hideEndBin=='function'){
									set.hideEndBin();
								}
							}else{
								_return.$dialog.off();
								_return.$dialog.fadeOut();
								if(set.isMask){
									_return._mask.hide();
								}
								//暂时去除页面的弹窗缓存，避免弹窗高度和宽度缓存
								_return.$dialog.remove();
							}
							_return.hideBind && _return.hideBind();
						},
						animateShowStart:false,
						animateShowEnd:false,
						animateShow:function(){
							//动画初始回调
							_return.animateShowStart && _return.animateShowStart();
							_return.show();
							//清洁
							$fullMsg.removeClass(set.animate.anIn);
							$fullMsg.removeClass(set.animate.anOut);
							clearTimeout(_return.fullMsgTimeout);
							//显示
							$fullMsg.addClass(set.animate.anIn);
							//动画结束回调
							if(_return.animateShowEnd){
								_return.fullMsgTimeout=setTimeout(function(){
									_return.animateShowEnd && _return.animateShowEnd();
								},set.animate.time);
							}
							return _return;
						},
						animateHideStart:false,
						animateHideEnd:false,
						animateHide:function(){
							//动画初始回调
							_return.animateHideStart && _return.animateHideStart();
							//清洁
							set.animate && $fullMsg.removeClass(set.animate.anIn);
							set.animate && $fullMsg.removeClass(set.animate.anOut);
							clearTimeout(_return.fullMsgTimeout);
							//隐藏
							$fullMsg.addClass(set.animate.anOut);
							//动画结束回调
							_return.fullMsgTimeout=setTimeout(function(){
								_return.hide();
								_return.animateHideEnd && _return.animateHideEnd();
								$fullMsg.removeClass(set.animate.anOut);
								if(set.hideEndBin){
									set.hideEndBin();
								}			
							},set.animate.time);
							return _return;
						},
						//自动显示隐藏，默认配置
						showAndAutoHideSettings:{
							waitTime:2000,
							hoverShow:false,
							animate:true,
							animateEnd:true
						},
						//自动显示隐藏
						//不支持animateShowStart、animateShowEnd、animateHideStart
						//支持animateHideEnd
						showAndAutoHide:function(opt){
							var settings=$.extend(_return.showAndAutoHideSettings,opt);
							//配置弹窗消失后的加载事件
							if(settings.hideEndBin){
								set.hideEndBin=settings.hideEndBin;
							}	
							var thisShow=function(){//show
								if(settings.animate){
									_return.animateShow();
								}else{
									_return.show();
								}
							};
							var thisHide=function(){//hide
								if(settings.animate){
									if(settings.animateEnd){
										_return.animateHide();
									}else{
										_return.hide();
									}
								}else{
									_return.hide();
								}
							};
							_return.thisreturn={
								mouseover:function(){thisShow();},
								mouseout:function(){
									_return.fullMsgTimeout=setTimeout(function(){
										$fullMsg.off("mouseover",_return.thisreturn.mouseover);
										$fullMsg.off("mouseout",_return.thisreturn.mouseout);
										thisHide();
									},settings.waitTime);
								},
								show:function(){
									thisShow();
									_return.fullMsgTimeout=setTimeout(function(){
										_return.thisreturn.hide();
									},settings.waitTime);
									if(settings.hoverShow){
										$fullMsg.off("mouseover",_return.thisreturn.mouseover).on("mouseover",_return.thisreturn.mouseover);
										$fullMsg.off("mouseout",_return.thisreturn.mouseout).on("mouseout",_return.thisreturn.mouseout);
									}
								},
								hide:function(){
									thisHide();
									if(settings.hoverShow){
										$fullMsg.off("mouseover",_return.thisreturn.mouseover);
										$fullMsg.off("mouseout",_return.thisreturn.mouseout);
									}
								}
							};
							_return.thisreturn.show();
							return _return;
						},
						//遮罩	
						mask:function(){
							var $mask='<div class="warm-mask fixed-top" id="warm-mask"></div>';
							$('body').append($mask);
							_return._mask=$('.'+set.mask.maskClass);
						},
						dialogClose:function(){
							$('.'+set.dialogWrapperClass+' .popClose').click(function(){
								_return.hide();
								if(set.closeFn){set.closeFn();}
							});
						},
						dialogConfirm:function(){
							if(set.yesFn){//清除事件叠加
								var $btn=$('.'+set.dialogWrapperClass+' .'+set.btnOkClass);
								$btn.off("click");
								$btn.on("click",function(){
									if(set.yesFn){set.yesFn();}
									_return.hide();
								});
							}
						},
						dialogCancel:function(){//清除事件叠加
							var $btn=$('.'+set.dialogWrapperClass+' .'+set.btnNoClass);
							$btn.off("click");
							$btn.on("click",function(){
								_return.hide();
								if(set.cancelFn){set.cancelFn();}
							});
						},
						mouseDown:function(e){
							var event=window.event||e;
							_return.mouseX=event.clientX;
							_return.mouseY=event.clientY;
							_return.objX=parseInt(_return.$dialog.css('left'));
							_return.objY=parseInt(_return.$dialog.css('top'));
						},
						mouseMove:function(e){
							var event=window.event||e,
							mouseX=event.clientX-_return.mouseX+_return.objX,
							mouseY=event.clientY-_return.mouseY+_return.objY;
							var top=(ming.wClientHeight()-_return.$dialog.height())/2;;
							_return.$dialog.css({
								left:mouseX,
								top:mouseY
							});
							return false;
						},
						execute:function(){
							var reset=function(){
								var dialogBuild=function(tpl){
									if(typeof(tpl)=='string'){
										var $dialog=$('#'+set.dialogWrapperId);
										if(!$dialog.size()){
											//外部包装容器开始
											$tmpl='<div class= "'+set.dialogWrapperClass+' '+set.dialogWrapperClassExt+'" id='+set.dialogWrapperClass+'><div id='+set.dialogAllId+'>';
											if(set.isMyHtml){//自己定义的html
												$tmpl+=set.html;
											} else {//标准的三层架构
												//标题
												if(!set.dialogWrapperClassExt){
													set.titleCont='<span class="msgTitle">'+set.titleCont+'</span>';
												}else{
													set.titleCont='<h3>'+set.titleCont+'</h3>';
												}
												$tmpl+='<div class="clearfix '+set.titleClass+'" id='+set.titleId+' ><span class="popRobbit mainIco icoPopHeader"></span>'+set.titleCont+'<a href="javascript:void(0);" class="popClose mainIco icoPopClose"></a></div>';
												//中间内容
												$tmpl+='<div class="'+set.contentClass+' word-break">'+tpl+'</div>';
												//底部内容
												if(set.isBottom){
													//底部按钮
													$tmpl+='<div class='+set.footerClass+'><button class='+set.btnOkClass+'>确定</button>';
													if(set.cancelBtn){
														$tmpl+='<button class='+set.btnNoClass+'>取消</button></div>';
													}else{
														$tmpl+='</div>';
													}
												}
											}
											//外部包装容器结束
											$tmpl+='</div></div>';
											$('body').append($tmpl);
										}else{
											$dialog.fadeIn();
										}
										
										_return.$dialog=$('#'+set.dialogWrapperClass);
										$dialogWrapper=$('#'+set.dialogWrapperId);
										
										if(set.width){
											$dialogWrapper.css({width:set.width});
										}
										if(set.height){
											$dialogWrapper.css({height:set.height});
										}
										//弹窗加载完的扩展事件
										if(set.tplEvent){
											set.tplEvent();
										}
										_return.show();
										_return.dialogConfirm();
										_return.dialogCancel();
										_return.dialogClose();
									 }else{
										 //加载的模版为空或者无权限
										 ming.gl.fullTip().html(tpl.info).showAndAutoHide(3000);
									 }
								};
								//获取弹窗,异步加载中间html模版
								if(set.tplUrl){
									 var getTplAjax=function(){
										 var param=$.extend({"is_tpl":true},set.tplParam);
										 $.post(set.tplUrl,param,function(tpl){	
											 dialogBuild(tpl);
										 });
									 };
									 getTplAjax();
								//获取弹窗,同步加载中间html模版
								}else{
									tpl=set.tplCont;
									dialogBuild(tpl);
								}	
							};
							if(!set.isMsg){
								reset();
							}
							return _return;
						}
				};
				return _return;
			}
		},
		//新浪微博分享
		sinaWbShare:function(opts){
			 var sets=$.extend({
				 width:"440",
				 height:"430",
				 source:"",
				 sourceUrl:"",
				 pic:"",//分享的图片链接地址
				 title:"",//分享内容
				 location:"",//内容链接|默认当前页location
				 charset:"gb2312"//页面编码
			 },opts);
			 var width=sets.width,height=sets.height,source=sets.source,sourceUrl=sets.sourceUrl;
			 var pic=sets.pic,title=sets.title,location=sets.location,charset=sets.charset;
			 
			 var e=encodeURIComponent;
			 var urlbase='http://v.t.sina.com.cn/share/share.php?appkey=60665216';
			 //var location=location||document.location;
			 var param=['&url=',e(location),'&title=',e(title||document.title),'&source=',e(source),'&sourceUrl=',e(sourceUrl),'&content=',charset||'gb2312','&pic=',e(pic||'')].join('');
			 function send(){
				 if(!window.open([urlbase,param].join(''),'mb',['toolbar=0,status=0,resizable=1,width=',width,',height=',height,',left=',(screen.width-440)/2,',top=',(screen.height-430)/2].join(''))){
					 location.href=[urlbase,param].join('');
				 }
			 }
			 if(/Firefox/.test(navigator.userAgent)){
				 setTimeout(send,0);
		     }else{ 
		    	 send();
			}
		 },
		//腾讯微博分享
		txWbShare:function(opts){
			 var sets=$.extend({
				 width:"700",
				 height:"680",
				 title:"",//分享内容
				 appkey:"",//从腾讯获得的appkey 
				 pic:"",//分享的图片
				 site:""//网站地址
			 },opts);
			 var width=sets.width,height=sets.height,title=sets.title||document.title;
			 var appkey='100265368',pic=sets.pic,site=sets.site;
			 
			 var _t = encodeURI(title); 
			 //var _url = encodeURI(document.location); 
			 var _url = encodeURI(site); 
			 var _appkey = encodeURI(appkey);
			 var _pic = encodeURI(pic);//（列如：var _pic='图片url1|图片url2|图片url3....） 
			 var _site = site;//你的网站地址 
			
			 var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic; 
			 window.open( _u,'转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		},
		//qq空间分享
		qZoneShare:function(opts){
			 var sets=$.extend({
				 title:"",//分享内容
				 pic:"",//分享的图片
				 url:"",//分享来源地址	 
				 summary:""//分享来源地址
			 },opts);
			 var pic=encodeURIComponent(sets.pic),title='冷笑话精选，分享身边的爆笑事',url=encodeURIComponent(sets.url||document.location.href),summary=encodeURIComponent(sets.title||document.title);
			 window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+title+'&pic='+pic+'&summary='+summary+'&desc='+summary);
		},
		//人人网分享,貌似只能分享链接
		rrShare:function(opts){
			 var sets=$.extend({
				 s:"440",
				 d:"430",
				 e:"",
				 pic:"",//分享的图片链接地址
				 title:"",//分享内容
				 link:""//分享的链接	 
			 },opts);
			 var s=sets.s||screen,d=sets.d||document,e=sets.e||encodeURIComponent,pic=sets.pic,title=sets.title;
			 var f='http://share.renren.com/share/buttonshare?link=';
			 var u=sets.link?sets.link:location.href,l='',p=[e(u),'&title='+title,e(l)].join('');
			 function send(){
				if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))
					u.href=[f,p].join('');
			 };
			 if(/Firefox/.test(navigator.userAgent)){
				setTimeout(send,0);
			 }else{ 
				send();
			 }
		},
		//微信朋友圈分享
		wxFriShare:function(data,cb){
		    if (typeof WeixinJSBridge == 'undefined') {
		        return false;
		    }else {
		        WeixinJSBridge.invoke('shareTimeline', {
		            'img_url': data.imgurl || '', // 图片url地址
		            'link': data.url, // 文章地址，此内容分享到朋友圈后可以点击跳转到此地址
		            'desc': data.desc,
		            'title': data.title
		        }, function(d) {
		            // 返回res.err_msg取值，d还有一个属性是err_desc
		            // share_timeline:cancel 用户取消
		            // share_timeline:fail　发送失败
		            // share_timeline:confirm 发送成功
		            WeixinJSBridge.log(d.err_msg);
		            cb && cb(d.err_msg);
		        });
		    }
		    return false;
		},
		//微信分享给朋友
		wxShare:function(data){
			if (typeof WeixinJSBridge == 'undefined') {
			    return false;
			}else {
			    WeixinJSBridge.invoke('sendAppMessage',{
					"appid":data.appId,
					"img_url":data.imgUrl,
					"img_width":"640",
					"img_height":"640",
					"link":data.link,
					"desc":data.desc,
					"title":data.title
				}, function(res) {});
			}
		}

	}
	window.ming=ming;
})(window);