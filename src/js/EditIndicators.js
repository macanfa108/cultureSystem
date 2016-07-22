//指标设置

(function($){
	
	$(function(){
		
		//页面一加载的时候加载指标参数列表
		$.ajax({
			type:"post",
			url:"",
			async:true,
			cache:false,
			data:"",
			dataType:"json",
			beforeSend:function(){
                $("body").append("<div id='load'>"+
                "		<div class='loading'>"+
                "			<img src='images/ajax-loader-3.gif'/>"+
                "		</div>"+
                "	</div>");
            },
			success:function(data){
            	 //测试拿到数据格式是否正确
//	                 	var i = JSON.stringify(data);
//	                 	alert(i);
            	 //加载页面的时候拿到总页面数量
             	totalPages1= data.result.pageNum;
//	                 	alert(totalPages1);
             	//拿到用户数据长度
             	var dataObj = data.result.rows;
             	var len = dataObj.length;
         		for(var i=0;i<len;i++){
             		$("#target_data_body").append(
         	            "	<tr>"+
         	            "			<td>"+dataObj[i].targetName+"</td>"+
         	            "			<td>"+dataObj[i].frequency+"</td>"+
         	            "			<td>"+dataObj[i].weight+"</td>");
             	}
			},
	        error:function(){
	            $("#targetSetting").prepend(
	 "					<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
	 "					<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	 "					</button>"+
	 "					<strong>加载失败！服务器开小差了￣へ￣</strong>"+
	 "					</div>");
	            $("#alert1").fadeOut(2500);
	         },
			complete:function(){
				 $("#load").remove();
			}
		});
		
	});
	
	
	//点击确定的时候提交数据、
	$("#sure").click(function(){
		//换成样式进行添加表单
		$("#myModal").addClass("bs-example-modal-sm");
		$(".modal-dialog").addClass("modal-sm");
		//添加表单到模态框中
		$(".modal-body").html("确定提交修改的指标？");
		$(".modal-footer").html("<button type='button' id='submit_target' class='btn btn-success' data-dismiss='modal'>提交修改</button>"+
		"<button type='button' class='btn btn-danger' data-dismiss='modal' >取消</button>");
		$('#myModal').modal();
		
		//点击确定修改提交数据
		$("#submit_target").on("click",function(){
			var selected = $("select").val();
			var frequencyText = $("#frequencyText").val();
			var weightText = $("#weightText").val();
			var targetJson = {
				selected:selected,
				frequencyText:frequencyText,
				weightText:weightText
			}
			targetJsonArr = JSON.stringify(targetJson);
//			alert(targetJsonArr);
			
			$.ajax({
				type:"post",
				url:"",
				async:true,
				cache:false,
				data:"",
				dataType:"json",
				beforeSend:function(){
                $("body").append("<div id='load'>"+
                "		<div class='loading'>"+
                "			<img src='images/ajax-loader-3.gif'/>"+
                "		</div>"+
                "	</div>");
           		},
				success:function(){
					
				},
				error:function(){
					$("#targetSetting").prepend(
	 "					<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
	 "					<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	 "					</button>"+
	 "					<strong>加载失败！服务器开小差了￣へ￣</strong>"+
	 "					</div>");
	            	$("#alert1").fadeOut(2500);
				},
				complete:function(){
					$("#load").remove();
				}
			});
		});
		
	});
	
})(jQuery);


