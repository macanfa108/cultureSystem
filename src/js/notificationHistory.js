		
		
	$(function(){
		var page = 1;
		
		//页面一加载发送ajax请求
		var totalPage;
		loadAjax(page);
		function loadAjax(page){
			$.ajax({
					type:"post",
					url:"${pageContext.request.contextPath}/user_selectPage.do?page.page="+page,
					async:false,//同步请求
					cache:false,//清除缓存
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
//						totalPage = JSON.stringify(data);
						totalPage = data.result.pageNum;
//						alert(totalPage);
						var dataObj = data.result.rows;
	                 	var len = dataObj.length;
                 		$("#warning_list_tbody").html("");
                 		for(var i=0;i<len;i++){
                     		$("#warning_list_tbody").append(
                 	            "	<tr>"+
                 	            "			<td><input type='checkbox' /></td>"+
                 	            "			<td>"+dataObj[i].id+"</td>"+
                 	            "			<td>"+dataObj[i].username+"</td>"+
                 	            "			<td>"+dataObj[i].email+"</td>"+
                 	            "			<td>"+dataObj[i].phonenumber+"</td>"+
                 	            "			<td>"+dataObj[i].registerTime+"7</td>"+
                 	            "			<td>"+dataObj[i].description+"</td>");
                     	}
					},
					error:function(){
						$("#user_list").prepend(
	"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
	"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	"						</button>"+
	"						<strong>编辑失败！服务器开小差了￣へ￣</strong>"+
	"						</div>");	
						$("#alert1").fadeOut(2500);
					},
					complete:function(){
						$("#load").remove();
					}
					
				});
			}
		
	        //jquery分页
	        $('.light-pagination').pagination({
	        	pages: totalPage,
	           	cssStyle: 'light-theme',
	           	onPageClick:function(page){
	               	loadAjax(page);
	       	}
	       });  
		
	        
	    //点击删除数据
		$("#delete_data").click(function(){
			deleteData("#delete_data");
		});
		
		
		function deleteData(delete_id){
			var $checkboxs = $(delete_id).parent("form").siblings("table").find("tbody").find("input[type=checkbox]");
			var checkboxLen = $checkboxs.length;//找到tr中全部checkbox的长度
			
			var $checkeds = $(delete_id).parent("form").siblings("table").find("tbody").find("input:checked");
			var checkedLen = $checkeds.length;//找到选中的checkbox长度
			var $deviceId = $checkeds.parent().next()//拿到选中td的id
			var idLen = $deviceId.length;
			var arr=[];
			//全选
			var $checkedAll = $(delete_id).parent("form")
			.siblings("table").find("thead").find("input:checked");
			var checkedAllLen = $checkedAll.length;
			//判断是否有选择删除的数据
			if(checkedAllLen==0 && checkedLen==0){
				$("#myModal").addClass("bs-example-modal-sm");
				$(".modal-dialog").addClass("modal-sm");
				$(".modal-body").text("请选择要删除的数据...");
				$(".modal-footer").html("<button type='button' class='btn btn-primary' data-dismiss='modal'>确定</button>");
				$('#myModal').modal();
			}else{
				$("#myModal").addClass("bs-example-modal-sm");
				$(".modal-dialog").addClass("modal-sm");
				$(".modal-body").text("点击确定后数据将被永久删除，确定删除吗？");
				$(".modal-footer").html("<button type='button' id='sure_delete' class='btn btn-primary' data-dismiss='modal'>确定</button>"+
				"<button type='button' class='btn btn-danger' data-dismiss='modal'>取消</button>");
				$('#myModal').modal();
				
				//点击确定删除执行的事件
				$("#sure_delete").click(function(){
					for(var i=0;i<idLen;i++){
						arr.push($deviceId[i].innerText);
					}
					ids = arr.toString();//转换成字符传 
					alert(ids);

					ids={"ids":ids}
					$.ajax({
						type:"post",
						url:"${pageContext.request.contextPath}/user_deleteByIds.do?",
						async:true,
						data:ids,
						dataType:"json",
						cache:false,
						beforeSend:function(){
							$("body").append("<div id='load'>"+
							"		<div class='loading'>"+
							"			<img src='images/ajax-loader-3.gif'/>"+
							"		</div>"+
							"	</div>");
						},
						success:function(data){
//							var dataResult = data.resutl.result;
							alert(JSON.stringify(data));
//							if(data.resutl.result == "success"){
								//删除后去掉全选的勾选
								var $chAll = $("table").find("input.checkAll").prop("checked",false);
								//从表中删除
								var deleteTrs = $checkeds.parents("tr");
								$(deleteTrs).remove();
								$("#warning_list").prepend(
			"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
			"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
			"						</button>"+
			"						<strong>删除数据成功!</strong>"+
			"						</div>");	
								$("#alert1").fadeOut(2500);
//							}
						},
						error:function(){
							$("#warning_list").prepend(
		"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
		"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
		"						</button>"+
		"						<strong>删除数据失败！服务器开小差了￣へ￣</strong>"+
		"						</div>");	
							$("#alert1").fadeOut(2500);
						},
						complete:function(){
							$("#load").remove();
						}
					});
				});
			}
					
		};	
		
		
		//点击全选
		var $table = $("table"); 
		$table.find(".checkAll").click(function(){
			//全选反选
			$(this).parents("thead").siblings("tbody").find("input").prop("checked",$(this).prop("checked"));
			//alert($(this).prop("checked"));
		});
		
		//点击td选中tr
		$("table").on("click","input[type=checkbox]",function(){
//			var checked = $(this).parent().find("input").prop("checked");
//			$(this).parent().find("input").prop("checked",!checked);
			//选中的长度等于总长度就把全选按钮勾上
			//所有tr的长度
			var trLen = $(this).parents("tbody").find("tr").length;
			//找到选中checkbox的长度
			var checktrLen = $(this).parents("tbody").find("tr").find("input:checked").length;
			var $checkAll = $(this).parents("tbody").siblings("thead").find("th").find("input[type=checkbox]");
			if(trLen == checktrLen){
				$checkAll.prop("checked",true);
			}else{
				$checkAll.prop("checked",false);					
			}
		});
			
	});
