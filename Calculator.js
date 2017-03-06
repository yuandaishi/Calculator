//按了等于键之后，相当于重新输入
;(function(){//立即执行
	var Calculator=function(){
		//console.log("hehhe")
		var that=this;
		var re_0=/^\d$/;//数字
		var re_1=/\./;//点
		var row=4;//每行多少个button
		var margin="5"//button之前的距离
		var calculateOr=false;//是否在进行计算
		var clear=false;//是否要清除数字
		var num_1="0";//计算的两个数。始终是两个数在进行着计算，并没有（）之类的，导致3个数这样的计算
		var num_2="0";//计算的两个数
		//var resultOr=false;//是否已经输入计算的第二个数
		var add=false;//是否加法运算
		var subtraction=false;//减
		var multiplication=false;//乘
		var division=false;//除
		var percent=false;//求余
		var resultNum="0";//每次计算的结果
		var arr=["清屏","清存",0,1,2,3,4,5,6,7,8,9,".","+","-","*","/","%","=","←"];
		var container=this.createBox("container",300,400,"#cccccc",document.body);
		container.style.margin="30px auto";
		var input=this.createBox("resultBox",300,60,"gold",container);
		input.innerHTML="0";
		input.style.fontSize="30px";
		input.style.boxSizing="border-box";
		input.style.textAlign="right";
		input.style.lineHeight="60px";
		var buttonBox=this.createBox("bottom",300,320,"#333333",container);
		buttonBox.style.marginTop="20px";
		var buttonLength=arr.length;
		var col=Math.round(buttonLength/row);//有多少列
		//console.log(buttonBox.clientWidth);
		var rowW=buttonBox.clientWidth/row-margin*2;
		var colH=buttonBox.clientHeight/col-margin*2;
		for(var i=0;i<buttonLength;i++){
			if(arr[i]=="清屏"){
				var button=this.createBox("button clear",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="清存"){
				var button=this.createBox("button clearAll",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="+"){
				var button=this.createBox("button add calculate",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="-"){
				var button=this.createBox("button subtraction calculate",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="*"){
				var button=this.createBox("button multiplication calculate",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="/"){
				var button=this.createBox("button division calculate",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="%"){
				var button=this.createBox("button percent calculate",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="="){
				var button=this.createBox("button result",rowW,colH,"#ac6a00",buttonBox);
			}else if(arr[i]=="←"){
				var button=this.createBox("button back",rowW,colH,"#ac6a00",buttonBox);
			}else{
				var button=this.createBox("button num",rowW,colH,"#ac6a00",buttonBox);
			}
			button.style.boxSizing="border-box";
			button.style.padding="5px";
			button.style.margin="5px";
			button.style.float="left";
			button.style.fontSize="20px";
			button.style.textAlign="center";
			button.style.lineHeight=colH-margin*2+"px";
			button.style.cursor="pointer";
			button.innerHTML=arr[i];
		}
		Array.prototype.forEach.call(document.getElementsByClassName("button"),function(e){
			e.addEventListener("click",function(){
				//console.log("kks");
				Array.prototype.forEach.call(document.getElementsByClassName("button"),function(e){
					e.style.background="rgb(172, 106, 0)";
				})
				this.style.background="#fff100";
			});
		});
		
		document.addEventListener("keydown",function(value){//键盘按下时
			//console.log(re_0.test("F5"));
			for(var i=0;i<document.getElementsByClassName("button").length;i++){
				//console.log(value.keyCode);
				if(value.key==document.getElementsByClassName("button")[i].innerHTML&&input.innerHTML.length<14){
					Array.prototype.forEach.call(document.getElementsByClassName("button"),function(e){
						e.style.background="rgb(172, 106, 0)";
					})
					document.getElementsByClassName("button")[i].style.background="#fff100";
					break;
				}else if(value.keyCode==8){
					Array.prototype.forEach.call(document.getElementsByClassName("button"),function(e){
						e.style.background="rgb(172, 106, 0)";
					})
					document.getElementsByClassName("back")[0].style.background="#fff100";
					break;
				}
			}
			
			var con=isNaN(num_2);
			var con_2=(value.key=="+"||value.key=="-"||value.key=="*"||value.key=="/"||value.key=="%");
			var con_3=(value.key=="0"||value.key=="1"||value.key=="2"||value.key=="3"||value.key=="4"||value.key=="5"||value.key=="6"||value.key=="7"||value.key=="8"||value.key=="9"||value.key==".");
			var con_4=(value.key=="=");
			var con_5=(value.keyCode==8);
			if(con_5){//按下退格键
				if(input.innerHTML.length>1){
					input.innerHTML=input.innerHTML.substring(0,input.innerHTML.length-1);
				}else{
					input.innerHTML=0;
				}
			}
			if(con_4){//表示键盘按下等于
//				var con=isNaN(num_2);//如果num_2==NaN的话，则说明只是按下了运算符号，并没有第二个计算参数
				if(!con){
					var spotLen=that.integer(num_1,num_2);
				}
				if(add&&!con){
					resultNum=(num_1*Math.pow(10,spotLen)+num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);	
				}
				if(subtraction&&!con){
					resultNum=(num_1*Math.pow(10,spotLen)-num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);	
				}
				if(multiplication&&!con){
					resultNum=(num_1*Math.pow(10,spotLen)*num_2*Math.pow(10,spotLen))/(Math.pow(10,spotLen)*Math.pow(10,spotLen));
				}
				if(division&&!con){
					resultNum=(num_1*Math.pow(10,spotLen))/(num_2*Math.pow(10,spotLen));
				}
				if(percent&&!con){
					resultNum=(num_1*Math.pow(10,spotLen))%(num_2*Math.pow(10,spotLen));
				}
				
				input.innerHTML=resultNum;
			}
			//console.log(con_2);
			if(!con&&con_2){
				calculateOr=true;//表示开始计算，而不是输入数字
				clear=true;//需要清除数字
				var spotLen=that.integer(num_1,num_2);
				if(add){//加法
					resultNum=(num_1*Math.pow(10,spotLen)+num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}else if(subtraction){//减法
					resultNum=(num_1*Math.pow(10,spotLen)-num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}else if(multiplication){//乘法
					resultNum=(num_1*Math.pow(10,spotLen)*num_2*Math.pow(10,spotLen))/(Math.pow(10,spotLen)*Math.pow(10,spotLen));
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}else if(division){//除法
					resultNum=(num_1*Math.pow(10,spotLen))/(num_2*Math.pow(10,spotLen));
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}else if(percent){//求余
					resultNum=(num_1*Math.pow(10,spotLen))%(num_2*Math.pow(10,spotLen));
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}
			}
//			if(value.key=="."&&!re_1.test(input.innerHTML)&&input.innerHTML.length<14){
//				//console.log("1")
//				input.innerHTML+=value.key;
//			}else if(input.innerHTML=="0"&&re_0.test(value.key)&&input.innerHTML.length<14){
//				//console.log("2")
//				input.innerHTML="";
//				input.innerHTML+=value.key;
//			}else if(re_0.test(value.key)&&input.innerHTML.length<14){
//				//console.log("3")
//				//console.log("jej")
//				input.innerHTML+=value.key;
//			} 
			
			if(clear&&con_3){//表示重新计数
				input.innerHTML="0";
				clear=false;
			}
			if(value.key=="."&&!re_1.test(input.innerHTML)&&input.innerHTML.length<14){
				input.innerHTML+=value.key;
				if(calculateOr){
					num_2=input.innerHTML;
				}else{
					num_1=input.innerHTML;
				}	
			}else if(input.innerHTML=="0"&&re_0.test(value.key)&&input.innerHTML.length<14){
				input.innerHTML="";
				input.innerHTML+=value.key;
				if(calculateOr){
					num_2=input.innerHTML;
				}else{
					num_1=input.innerHTML;
				}	
			}else if(re_0.test(value.key)&&input.innerHTML.length<14){
				input.innerHTML+=value.key;
				if(calculateOr){
					num_2=input.innerHTML;
				}else{
					num_1=input.innerHTML;
				}	
			}
			//console.log("jje")
			
			var symbol=value.key;
			//	console.log(symbol);
			switch (symbol){
				case "+":
					add=true;//是否加法运算
					subtraction=false;
					multiplication=false;
					division=false;
					percent=false;
					break;
				case "-":
					add=false;//是否加法运算
					subtraction=true;
					multiplication=false;
					division=false;
					percent=false;
					break;
				case "*":
					add=false;//是否加法运算
					subtraction=false;
					multiplication=true;
					division=false;
					percent=false;
					break;
				case "/":
					add=false;//是否加法运算
					subtraction=false;
					multiplication=false;
					division=true;
					percent=false;
					break;
				case "%":
					add=false;//是否加法运算
					subtraction=false;
					multiplication=false;
					division=false;
					percent=true;
					break;
				default:
					break;
			}
		});
		document.getElementsByClassName("clear")[0].addEventListener("click",function(){//onclick覆盖了之前的颜色变化,所以改用addEventListener
			input.innerHTML="0";
		});
		
		document.getElementsByClassName("clearAll")[0].addEventListener("click",function(){//清存。则num_1和num_2重置
			input.innerHTML="0";
			num_1="0";
			num_2="0";
		});
		
		document.getElementsByClassName("back")[0].addEventListener("click",function(){//点击退格键，触发函数
			if(input.innerHTML.length>1){
				input.innerHTML=input.innerHTML.substring(0,input.innerHTML.length-1);
			}else{
				input.innerHTML=0;
			}
		});
		
		Array.prototype.forEach.call(document.getElementsByClassName("calculate"),function(e){
			e.addEventListener("click",function(){//每次都是上一次运算符号的运算结果，而不是正在点击的这一次
				//console.log(e);
				calculateOr=true;//表示开始计算，而不是输入数字
				clear=true;//需要清除数字
				//if(resultOr){//表示该显示结果了啊
				//num_2=input.innerHTML;
				//console.log(num_1+"||"+num_2);
				var con=isNaN(num_2);//如果num_2==NaN的话，则说明只是按下了运算符号，并没有第二个计算参数
				if(!con){
					var spotLen=that.integer(num_1,num_2);
				}
				if(add&&!con){
					resultNum=(num_1*Math.pow(10,spotLen)+num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}
				if(subtraction&&!con){
					resultNum=(num_1*Math.pow(10,spotLen)-num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}
				if(multiplication&&!con){
					resultNum=(num_1*Math.pow(10,spotLen)*num_2*Math.pow(10,spotLen))/(Math.pow(10,spotLen)*Math.pow(10,spotLen));
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}
				if(division&&!con){
					resultNum=(num_1*Math.pow(10,spotLen))/(num_2*Math.pow(10,spotLen));
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}
				if(percent&&!con){
					resultNum=(num_1*Math.pow(10,spotLen))%(num_2*Math.pow(10,spotLen));
					input.innerHTML=resultNum;
					num_1=input.innerHTML;
					num_2=NaN;
				}
				//console.log(resultNum);
				var symbol=e.innerHTML;
			//	console.log(symbol);
				switch (symbol){
					case "+":
						add=true;//是否加法运算
						subtraction=false;
						multiplication=false;
						division=false;
						percent=false;
						break;
					case "-":
						add=false;//是否加法运算
						subtraction=true;
						multiplication=false;
						division=false;
						percent=false;
						break;
					case "*":
						add=false;//是否加法运算
						subtraction=false;
						multiplication=true;
						division=false;
						percent=false;
						break;
					case "/":
						add=false;//是否加法运算
						subtraction=false;
						multiplication=false;
						division=true;
						percent=false;
						break;
					case "%":
						add=false;//是否加法运算
						subtraction=false;
						multiplication=false;
						division=false;
						percent=true;
						break;
					default:
						break;
				}
			})
		})
//		document.getElementsByClassName("calculate")[0].addEventListener("click",function(){//加
//			add=true;//是否加法运算
//			subtraction=false;
//			multiplication=false;
//			division=false;
//			percent=false;
//			calculateOr=true;//表示开始计算，而不是输入数字
//			clear=true;//需要清除数字
//			//if(resultOr){//表示该显示结果了啊
//			//num_2=input.innerHTML;
//			//console.log(num_1+"||"+num_2);
//			var spotLen=that.integer(num_1,num_2);
//			resultNum=(num_1*Math.pow(10,spotLen)+num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);
//			//console.log(resultNum);
//			input.innerHTML=resultNum;
//			num_1=input.innerHTML;
//			num_2="0";
//				//resultOr=false;
//			//}
//		})
		
		document.getElementsByClassName("result")[0].addEventListener("click",function(){
			var con=isNaN(num_2);//如果num_2==NaN的话，则说明只是按下了运算符号，并没有第二个计算参数
			if(!con){
				var spotLen=that.integer(num_1,num_2);
			}
			if(add&&!con){
				resultNum=(num_1*Math.pow(10,spotLen)+num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);	
			}
			if(subtraction&&!con){
				resultNum=(num_1*Math.pow(10,spotLen)-num_2*Math.pow(10,spotLen))/Math.pow(10,spotLen);	
			}
			if(multiplication&&!con){
				resultNum=(num_1*Math.pow(10,spotLen)*num_2*Math.pow(10,spotLen))/(Math.pow(10,spotLen)*Math.pow(10,spotLen));
			}
			if(division&&!con){
				resultNum=(num_1*Math.pow(10,spotLen))/(num_2*Math.pow(10,spotLen));
			}
			if(percent&&!con){
				resultNum=(num_1*Math.pow(10,spotLen))%(num_2*Math.pow(10,spotLen));
			}
			
			input.innerHTML=resultNum;
			//resultOr=false;
//			num_1=input.innerHTML;还是最初的
		});
		
		Array.prototype.forEach.call(document.getElementsByClassName("num"),function(e){
			e.addEventListener("click",function(){
				if(clear){//表示重新计数
					input.innerHTML="0";
					clear=false;
				}
				if(e.innerHTML=="."&&!re_1.test(input.innerHTML)&&input.innerHTML.length<14){
					input.innerHTML+=e.innerHTML;
					if(calculateOr){
						num_2=input.innerHTML;
					}else{
						num_1=input.innerHTML;
					}	
				}else if(input.innerHTML=="0"){
					input.innerHTML="";
					input.innerHTML+=e.innerHTML;
					if(calculateOr){
						num_2=input.innerHTML;
					}else{
						num_1=input.innerHTML;
					}	
				}else if(re_0.test(e.innerHTML)&&input.innerHTML.length<14){
					input.innerHTML+=e.innerHTML;
					if(calculateOr){
						num_2=input.innerHTML;
					}else{
						num_1=input.innerHTML;
					}	
				}
				//console.log(num_1)
			})
		})
	};
	
	Calculator.prototype={
		createBox:function(Class,wid,hei,bg,parent){//创建box
			var Box=document.createElement("div");
			Box.className=Class;
//			Box.clientWidth=wid;//这个属性是只读的，不能改变
//			Box.clientHeight=hei;////这个属性是只读的，不能改变
//			Box.style.backgroundColor=bg;
			Box.setAttribute("style","width: "+wid+"px;height: "+hei+"px;background: "+bg+";");
			parent.appendChild(Box);
			return Box;
		},
		integer:function(){//取整,避免浮点数计算出现错误
			var a=0;
			for(var i=0;i<arguments.length;i++){
				//console.log(arguments)
				if(arguments[i].indexOf(".")>=0){//有小数点的话
					var b=arguments[i].length-arguments[i].indexOf(".")-1;//小数点之后有几位
					if(b>a){//这样，最后a等于最大的位数
						a=b;
					}
				}	
			}
			return a;//返回小数点位数
		}
	};
	window.Calculator=Calculator;//改为全局变量
})();
