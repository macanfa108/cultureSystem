		
		
	$(function(){
		
		$("#delete_data").click(function(){
			deleteData("#delete_data");
		});
		
		
		function deleteData(delete_id){
			var $checkboxs = $(delete_id).parent("form").siblings("table").find("tbody").find("input[type=checkbox]");
			var checkboxLen = $checkboxs.length;//找到tr中全部checkbox的长度
			
			var $checkeds = $(delete_id).parent("form").siblings("table").find("tbody").find("input:checked");
			var checkedLen = $checkeds.length;//找到选中的checkbox长度
			var $deviceId = $checkeds.parent().next().text();//拿到选中td的id
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
				
				$("#sure_delete").click(function(){
					for(var i=0;i<idLen;i++){
						arr.push($deviceId[i]);
					}
					arr = arr.toString();//转换成字符传 
					alert(arr);
					$.ajax({
						type:"post",
						url:"",
						async:true,
						data:arr,
						dataType:"json",
						cache:false,
						success:function(){
							
						},
						error:function(){
							
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
//		$("table").find("tr").find("td:not(:last-child)").on("click",function(){
//			var checked = $(this).parent().find("input").prop("checked");
//			$(this).parent().find("input").prop("checked",!checked);
//			//选中的长度等于总长度就把全选按钮勾上
//			var trLen = $(this).parents("tbody").find("tr").length;
//			var checktrLen = $(this).parents("tbody").find("tr").find("input:checked").length;
//			var $checkAll = $(this).parents("tbody").siblings("thead").find("th").find("input[type=checkbox]");
//			if(trLen == checktrLen){
//				$checkAll.prop("checked",true);
//			}else{
//				$checkAll.prop("checked",false);					
//			}
//		});
			
	});
