/*
 * 描述:使用HTML5的websocket主动向前台推送数据，将数据和模板合成后输出到前台！
 * 时间：2016/7/27
 * 作者：马灿发
 * */
$(function(){
	var ws; // 就是一个通信管道
  	var target = "ws://localhost:8080//DaChuang/index";//服务端的url，注意以ws开头
  //三个判断用于获取ws通信管道（浏览器兼容）
		if('WebSocket' in window){
			ws = new WebSocket(target);
		}else if('MozWebSocket' in window){
			ws = new MozMozWebSocket(target);
		}else{
			//浏览器不支持！
			$("#unsupported").modal("show");

			return;
		}

		ws.onmessage=function(event){
			//每次都是返回一个json对象
			//对象内一个type和一个data
			//转换json
			var data=JSON.parse(event.data);
			//type为1表示各个指标的数据信息对象
			if(data.type==1){
				$("#temperture").html(data.data.temperture+"℃");
				$("#rjy_zd").html(data.data.rjy_zd+"mg/L");
				$("#rjy_bhd").html(data.data.rjy_bhd+"%");
				$("#ph").html(data.data.ph);
			}
			//获得预警提醒数据
			if(data.type==2){

				var html="";
				var len=data.data.length;
				for(var i=0;i<len;i++){

					html+='<tr class="danger">'+
							'<td>'+data.data[i].id+'</td>'+
							'<td>'+data.data[i].collector_name+'</td>'+
							'<td>温度为29℃，过高！</td>'+
							'<td>2016/5/18 22:09:27</td>'+
							'<td>...</td>'+
						'</tr>';
				}
				$("#notificationTable").html(html);
			}


		}
		ws.onclose = function(){
			$("#indexContent").prepend(
				     "<div class='alert alert-danger alert-dismissible fade in' id='disconnect' role='alert'>"+
				     "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				     "<span aria-hidden='true'>&times;</span>"+
				     "</button>"+
				     "<strong>已和服务器断开连接！请刷新重试！</strong>"+
				     "</div>");
		}
});
