//该方法封装的是通用的给元素绑定事件监听的方法
//参数1：监视哪一个元素
//参数2：监视的行为(事件类型)
//参数3：行为发生时，执行的函数
function bindEvent(element,eventType,fn){
	if(window.attachEvent){
		//支持attachEvent方法,IE低版本的浏览器
		element.attachEvent("on"+eventType,fn);
	}else{
		element.addEventListener(eventType, fn, false);
	}
}

//通过id属性返回节点对象
function $(id){
	return document.getElementById(id);
}

//根据class属性返回对应的节点对象
//参数1：oParent 查找的范围，更精确，速度更快
//参数2：clsName 查询的class属性值，例如msg，表示查询的是class属性是msg的元素
//return 返回数组
function getByClass(oParent,clsName){
	//先找到oParent节点里面的所有子元素(所有的标签)
	var childs = oParent.getElementsByTagName('*');

	var arr = [];
	for(var i=0;i<childs.length;i++){
		if(childs[i].className == clsName){
			arr.push(childs[i]);
		}
	}
	return arr;
}

//封装的拖拽的代码
//参数1：拖拽的对象
//参数2：拖拽的范围
function drag(obj,scope,oContent,oBox){
	obj.onmousedown = function(){
		//在mousedown里面进行移动
		obj.onmousemove = function(e){
			var ev = e || window.event;
			var mouseX = ev.clientX;
			var mouseY = ev.clientY;
			
			var oImgX = mouseX - scope.offsetLeft - obj.offsetWidth/2;
			var oImgY = mouseY - scope.offsetTop - obj.offsetHeight/2;

			if(oImgX <= 0){
				oImgX = 0;
			}
			if(oImgY <= 0){
				oImgY = 0;
			}
			if(oImgX >= scope.clientWidth - obj.clientWidth){
				oImgX = scope.clientWidth - obj.clientWidth;
			}
			if(oImgY >= scope.clientHeight - obj.clientHeight){
				oImgY = scope.clientHeight - obj.clientHeight;
			}

			//在这里拖拽

			document.title = oImgX;
			//oImgX / (scope.clientWidth - obj.clientWidth) = contentY / (oContent.clientHeight - oBox.clientHeight);
			var contentY = -oImgX / (scope.clientWidth - obj.clientWidth) * (oContent.clientHeight - oBox.clientHeight);
			oContent.style.top = contentY+'px';

			obj.style.left = oImgX +'px';
			obj.style.top = oImgY +'px';

			return false;
		}
		document.onmouseup = function(){
			obj.onmousemove = null;
		}
		//阻止浏览器的默认行为
		return false;
	}
}

//将设置某个元素属性的值封装起来
//参数1：设置的元素对象
//参数2：属性名
//参数3：属性值
function setStyle(obj,json){
	for(var attr in json){
		obj.style[attr] = json[attr];
	}
}

//获得一个元素任意属性的值
//参数1：节点对象
//参数2：属性名
//说明：返回的结果是带有单位的  100px
function getStyle(obj,attr){
	if(obj.currentStyle){
		//说明是ie浏览器
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

//执行动画效果
//参数1：执行动画的dom元素
//参数2：json对象，包含了属性值键值对的形式 ,例如：{width:300,height:500,opacity:60}   0.3  0.5 
//参数3：动画执行完毕的回调函数
function animate(obj,json,fn){
	var flag = true;	//默认都是到达终点、目的地
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		for(var attr in json){
			//通过循环拿到执行动画的所有属性
			//根据当前的位置 和 目的地的值，进行判断，该加速？还是减速			

			//针对透明度特殊处理，因为透明度是小数，容易计算出错,传递值的时候，传递百分制的数
			if(attr=='opacity'){
				var now = parseInt(getStyle(obj,attr) * 100);		//如果0.5  ---> 50
				var speed = (json[attr] - now)/10;
			}else{
				var now = parseInt(getStyle(obj,attr));
				var speed = (json[attr] - now)/10;
			}

			//如果speed>0 多加一点 加到300；如果小于0，多减一点，减到0
			speed >0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);

			if(now != json[attr]){	
				//任意一个属性还没有到达，就修改为false					
				flag = false;
			}else{
				//如果到达了就修改为true
				flag = true;
			}
			//让每个属性变化
			if(attr=='opacity'){
				obj.style[attr] = (now + speed)/100;
			}else{
				obj.style[attr] = now + speed +'px';
			}
		}

		//判断是否到达终点，是否停止动画，必须循环外面
		if(flag){
			//全部到达目的地再停止动画
			clearInterval(obj.timer);
			if(fn){
				fn();	//如果用户传递回调函数了，就执行
			}
		}
	}, 50)
}