$(function(){

  var activeImgUrl={};//外传数：设备动态图(既然用数组麻烦，用对象吧！哈哈哈)
  var imgUrl={};//静态图片
  var dataTable=[];
  var deviceContainer=$("#deviceContainer");
  //初始化设备数据
//  $.ajax({
//    url:"${pageContext.request.contextPath}/device_selectAllDevices.do",
//    async:false,//同步才能让外部拿到数据
//    data:{},
//    dataType:'json',
//    success:function(data){
//      var html="";
//      console.info(data);
//      var data = data.result.devices;
//      console.info(data);
//      for(var i=0;i<data.length;i++){
//        //将数据外传，以对象key/value形式存储数据
//        activeImgUrl[data[i].deviceName]=data[i].activeImgUrl;
//        imgUrl[data[i].deviceName]=data[i].imgUrl;
//        dataTable.push(data[i].deviceName);//用于生成后面各设备数据表格
//
//        html+='<div class="col-sm-6 col-md-4 parentCon">'+
//        '<div class="tile deviceTile">'+
//        '<img src='+data[i].imgUrl+'  class="deviceImg">'+
//        '<h3>'+data[i].deviceName+'</h3>'+
//        '<button class="btn btn-success" role="button" class="powerBtn" data-id="'+data[i].id+'">'+
//        '<span class="icon icon-off"></span> 开启设备'+
//        '</button>'+
//        '</div>'+
//        '</div>';
//      }
//      deviceContainer.html(html);
//    },
//    error:function(){
//      alert('初始化获取设备失败！');
//    }
//  });
	  /*websocket*/
	  var ws; // 就是一个通信管道
	 var target = "ws://localhost:8080//DaChuang/device";//服务端的url，注意以ws开头
	 //三个判断用于获取ws通信管道（浏览器兼容）
		if('WebSocket' in window){
			ws = new WebSocket(target);
		}else if('MozWebSocket' in window){
			ws = new MozWebSocket(target);
		}else{
			//浏览器不支持！
			$("#unsupported").modal("show");
			return;
		}
		//其实点击开启设备的时候可以直接openwebsocket，判断成功连接就出现警告框了！可以少一次ajax
		ws.onmessage=function(event){
			//每次都是返回一个json对象
			//对象内一个type和一个data
			//转换json
//			var data=JSON.parse(event.data);
//			alert(JSON.stringify(data));
//			//拿到数据之后进行相应操作！下面模拟操作,返回的json中isClosed=1表示设备运行后关闭！
//			if(data.data.type=1){
//				//设置动态图
//			    This.siblings(".deviceImg").prop({"src":imgUrl[imgKey]});
//			    //禁用按钮
//			    This.prop('disabled',false);
//			    //关闭警告框(找到生成的模板里对应的ID）
//			    $("#"+This.data('id')).remove();
//			}
			
			
	      var html="";
	      var data = JSON.parse(event.data).devices;
	      //获取设备的状态
	      var status = data.status;
	      for(var i=0;i<data.length;i++){
	        //将数据外传，以对象key/value形式存储数据
	        activeImgUrl[data[i].deviceName]=data[i].activeImgUrl;
	        imgUrl[data[i].deviceName]=data[i].imgUrl;
	        dataTable.push(data[i].deviceName);//用于生成后面各设备数据表格
//	        console.log(data[i].imgUrl);

		    //判断设备的当前状态，如果是on，那么页面加载的时候开启设备改为active
	        var flag = true;
		    if(data[i].status == "on"){
		    	data[i].imgUrl = data[i].activeImgUrl;
		    	html+='<div class="col-sm-6 col-md-4 parentCon">'+
		        '<div class="tile deviceTile">'+
		        '<img src='+data[i].imgUrl+'  class="deviceImg">'+
		        '<h3>'+data[i].deviceName+'</h3>'+
		        '<button class="btn btn-success powerBtn" disabled="disabled" role="button" data-id="'+data[i].id+'">'+
		        '<span class="icon icon-off"></span> 开启设备'+
		        '</button>'+
		        '</div>'+
		        '</div>';
		    }else{
		    	html+='<div class="col-sm-6 col-md-4 parentCon">'+
		        '<div class="tile deviceTile">'+
		        '<img src='+data[i].imgUrl+'  class="deviceImg">'+
		        '<h3>'+data[i].deviceName+'</h3>'+
		        '<button class="btn btn-success powerBtn" role="button" data-id="'+data[i].id+'">'+
		        '<span class="icon icon-off"></span> 开启设备'+
		        '</button>'+
		        '</div>'+
		        '</div>';

		    }
	        	        
	        
	      }
	      deviceContainer.html(html);
			
		}
		ws.onclose = function(){
			$("#content-header").prepend(
				     "<div class='alert alert-danger alert-dismissible fade in' id='disconnect' role='alert'>"+
				     "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				     "<span aria-hidden='true'>&times;</span>"+
				     "</button>"+
				     "<strong>已和服务器断开连接！请刷新重试！</strong>"+
				     "</div>");
		} 
			
		/*websocket*/
		
		
  //开启设备：事件委托
  $("#deviceContainer").off().on('click',$(".powerBtn"),function(e){
    //获得触发事件源
    var This=$(e.target);
    //获取activeImgUrl的key值
    var imgKey=This.siblings('h3').text();

    //判断事件源是否是按钮
    if(This.attr('role')!='button'){
      return;
    }
//    设置动态图
    This.siblings(".deviceImg").prop({"src":activeImgUrl[imgKey]});
//    禁用按钮
    This.prop('disabled',true);
    //同时发送ajax
//    $.ajax({
//      url:'openDevice.json',
//      data:{
//        "deviceID":This.data('id')
//      },
//      async:true,
//      dataType:'json',
//      success:function(data){
//        var msgAlert='';
//        if(data.Msg=="success"){
//
//          msgAlert='<div class="container-fluid" id="'+This.data('id')+'">'+
//      		'	<div class="alert alert-success" role="alert">'+
//      		'		<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
//      		'			<span aria-hidden="true">&times;</span>'+
//      		'		</button>'+
//      		'		<strong>'+imgKey+'设备已开启！正在运行中！</strong>'+
//      		'	</div>'+
//      		'</div>';
//          
//          /*websocket*/
//         var ws; // 就是一个通信管道
//        var target = "ws://localhost:8080//DaChuang/index";//服务端的url，注意以ws开头
//        //三个判断用于获取ws通信管道（浏览器兼容）
//      		if('WebSocket' in window){
//      			ws = new WebSocket(target);
//      		}else if('MozWebSocket' in window){
//      			ws = new MozWebSocket(target);
//      		}else{
//      			//浏览器不支持！
//      			$("#unsupported").modal("show");
//      			return;
//      		}
//      		//其实点击开启设备的时候可以直接openwebsocket，判断成功连接就出现警告框了！可以少一次ajax
//      		ws.onmessage=function(event){
//    			//每次都是返回一个json对象
//    			//对象内一个type和一个data
//    			//转换json
//    			var data=JSON.parse(event.data);
//    			
//    			//拿到数据之后进行相应操作！下面模拟操作,返回的json中isClosed=1表示设备运行后关闭！
//    			if(data.data.type=1){
//    				//设置动态图
//    			    This.siblings(".deviceImg").prop({"src":imgUrl[imgKey]});
//    			    //禁用按钮
//    			    This.prop('disabled',false);
//    			    //关闭警告框(找到生成的模板里对应的ID）
//    			    $("#"+This.data('id')).remove();
//    			}
//    		}
//      		ws.onclose = function(){
//      			$("#content-header").prepend(
//    				     "<div class='alert alert-danger alert-dismissible fade in' id='disconnect' role='alert'>"+
//    				     "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
//    				     "<span aria-hidden='true'>&times;</span>"+
//    				     "</button>"+
//    				     "<strong>已和服务器断开连接！请刷新重试！</strong>"+
//    				     "</div>");
//    		} 
//    			
//      		/*websocket*/
//      		
//
//        }else{
//          msgAlert='<div class="container-fluid">'+
//      		'	<div class="alert alert-danger" role="alert">'+
//      		'		<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
//      		'			<span aria-hidden="true">&times;</span>'+
//      		'		</button>'+
//      		'		<strong>'+imgKey+'设备开启失败！请检查设备！</strong>'+
//      		'	</div>'+
//      		'</div>';
//        }
//        $("#content-header").after(msgAlert);
//      },
//      error:function(){
//        alert("ajax开启设备失败！请检查网络！");
//      }
//    });


  });
  //添加设备
  $("#sureAddDevice").click(function(){
    var addDeviceForm=$("#addDeviceForm");
    var addDeviceFormInput=addDeviceForm.find("input[type='text']");
    var len=addDeviceFormInput.length;
    console.log(addDeviceForm.serialize());
    for(var i=0;i<len;i++){
      if($(addDeviceFormInput[i]).val().trim()==""){
        $("#addMsg").html('请完善好信息！');
        return;
      }
    }
    $.ajax({
      url:"addDeviceSuccess.json",
      data:{
        "addDeviceForm":addDeviceForm.serialize()
      },
      dataType:'json',
      async:false,
      success:function(data){
        if(data.result=='success'){
          var html="";
          var deviceContainer=$("#deviceContainer");
          activeImgUrl[data.deviceName]=data.activeImgUrl;

            html='<div class="col-sm-6 col-md-4 parentCon">'+
            '<div class="tile deviceTile">'+
            '<img src='+data.imgUrl+'  class="deviceImg">'+
            '<h3>'+data.deviceName+'</h3>'+
            '<button class="btn btn-success" role="button" class="powerBtn" data-id="'+data.id+'">'+
            '<span class="icon icon-off"></span> 开启设备'+
            '</button>'+
            '</div>'+
            '</div>';
          deviceContainer.append(html);

          $("#myModal").modal("hide");
          //之后需要动态生成该设备的表格，或者除此添加没有表格生成，后续刷新会从数据库动态生成
        }
      },
      error:function(){
        alert('添加设备出错！');
      }
    });


  });

  for(var i=0;i<dataTable.length;i++){
    console.time("a");
    var html='';
    html='<hr><div class="container-fluid deviceDataTable">'+
    '  <h5 class="pull-left">'+dataTable[i]+'</h5>'+
    '  <form class="form-inline list_delete pull-right">'+
    '    <button type="button" class="btn btn-info">刷新</button>'+
    '      <div class="form-group">'+
    '        <div class="input-group">'+
    '            <input type="text" class="form-control" placeholder="搜索记录">'+
    '            <div class="input-group-addon">搜索</div>'+
    '        </div>'+
    '      </div>'+
    '  </form>'+
    '  <div class="clearfix"></div>'+
    '  <div class="table-responsive">'+
    '    <table class="table table-hover table-bordered table-striped table-condensed">'+
    '      <thead>'+
    '        <th>数据ID</th>'+
    '        <th>设备ID</th>'+
    '        <th>设备名</th>'+
    '        <th>位置</th>'+
    '        <th>开启时间</th>'+
    '        <th>关闭时间</th>'+
    '        <th>备注</th>'+
    '      </thead>'+
    '      <tbody>'+
    '      </tbody>'+
    '    </table>'+
    '  </div>'+
    '  <div class="page">'+
    '    <div class="pagination-holder">'+
    '      <div class="light-pagination'+(i+1)+' class="pagination"></div>'+
    '    </div>'+
    '  </div>'+
    '</div>';
    deviceContainer.after(html);
    console.timeEnd("a");
  }
  //jquery表格分页
  var paginationLength =dataTable.length;
//  console.log(paginationLength);
  for (var i = 1; i <= paginationLength; i++) {
      $('.light-pagination'+i).pagination({
          pages: 10,
          cssStyle: 'light-theme'
      });
  }
  //点击分页ajax请求分页数据

});
