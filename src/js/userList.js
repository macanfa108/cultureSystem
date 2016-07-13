
/*用户管理*/
$(function(){
			//页面已加载的时候获取文本框的焦点
			$("#user_message").focus();
			$("#delete_user").click(function(){
				deleteData("#delete_user");
			});
			$("#delete_history").click(function(){
				deleteData("#delete_history");
			});
			
			function deleteData(delete_id){
				var $checkboxs = $(delete_id).parent("form").siblings("table").find("tbody").find("input[type=checkbox]");
				var checkboxLen = $checkboxs.length;//找到tr中全部checkbox的长度
				
				var $checkeds = $(delete_id).parent("form").siblings("table").find("tbody").find("input:checked");
				var checkedLen = $checkeds.length;//找到选中的checkbox长度
				var $userId = $checkeds.parent().next().text();//拿到选中td的id
				var idLen = $userId.length;
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
							arr.push($userId[i]);
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
				
			}
			
				//点击td选中tr
				$("table").find("tr").find("td:not(:last-child)").on("click",function(){
					var checked = $(this).parent().find("input").prop("checked");
					$(this).parent().find("input").prop("checked",!checked);
					//选中的长度等于总长度就把全选按钮勾上
					var trLen = $(this).parents("tbody").find("tr").length;
					var checktrLen = $(this).parents("tbody").find("tr").find("input:checked").length;
					var $checkAll = $(this).parents("tbody").siblings("thead").find("th").find("input[type=checkbox]");
					if(trLen == checktrLen){
						$checkAll.prop("checked",true);
					}else{
						$checkAll.prop("checked",false);					
					}
				});
			
			
				//点击全选
				var $table = $("table"); 
				$table.find(".checkAll").click(function(){
					//全选反选
					$(this).parents("thead").siblings("tbody").find("input").prop("checked",$(this).prop("checked"));
					//alert($(this).prop("checked"));
				});
			
				
				//点击编辑用户信息
				$("table").find(".edit_message").click(function(){
					var $tds = $(this).parents("tr").find("td");
					var tdslen = $tds.length;
					var arr2 = [];
					for(var i=2;i<tdslen;i++){
						arr2.push($tds[i].innerText);
					}
					
					//alert(typeof arr2);object
					//arr2 = arr2.toString();
					//alert(typeof arr2);string
					$("#myModal").removeClass("bs-example-modal-sm");
					$(".modal-dialog").removeClass("modal-sm");
					
					$(".modal-body").html(
					"	<form>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>用户名</label>"+
           			" 	 	<input type='text' name='user_name' id='user_name' class='form-control' value='"+arr2[0]+"'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>邮箱</label>"+
           			" 	 	<input type='email'  name='user_email' id='user_email' class='form-control' value='"+arr2[1]+"'>"+
           			"	 </div>"+
			        "  </div>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>手机</label>"+
           			" 	 	<input type='text' name='user_phone' id='user_phone' class='form-control' value='"+arr2[2]+"'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>注册时间</label>"+
           			" 	 	<input type='text' name='user_createTime' id='user_createTime' class='form-control' value='"+arr2[3]+"'>"+
           			"	 </div>"+
			        "  </div>"+
			        "  <div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>备注</label>"+
           			" 	 	<input type='text' name='user_other' id='user_other' class='form-control' value='"+arr2[4]+"'>"+
           			"	 </div>"+
			        "  </div>"+
					" </form>");
					$(".modal-footer").html("<button type='button' id='save' class='btn btn-primary' >保存</button>"+
					"<button type='button' class='btn btn-danger' data-dismiss='modal' >取消</button>");
					$('#myModal').modal();
					
					//编辑后保存用户到数据库
					$("#save").click(function(){
						var arr2_1 = [];
						arr2_1[0] = $("#user_name").val();
						arr2_1[1] = $("#user_email").val();
						arr2_1[2] = $("#user_phone").val();
						arr2_1[3] = $("#user_createTime").val();
						arr2_1[4] = $("#user_other").val();
						alert(arr2_1);
						$.ajax({
							type:"post",
							url:"",
							async:true,
							data:arr2_1,
							dataType:"json",
							cache:false,
							success:function(){
								
							},
							error:function(){

								
							}
						});
						
					});
					
				});
				
				//点击添加用户
				
				$("#add_user").click(function(){
					$("#myModal").removeClass("bs-example-modal-sm");
					$(".modal-dialog").removeClass("modal-sm");
					
					$(".modal-body").html(
					"	<form id='new_user'>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>用户名</label>"+
           			" 	 	<input type='text' class='form-control' name='username' id='username' placeholder='必填' >"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>密码</label>"+
           			" 	 	<input type='text' class='form-control' name='password' id='password'  placeholder='必填'>"+
           			"	 </div>"+
			        "  </div>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>邮箱</label>"+
           			" 	 	<input type='email' class='form-control' name='email' id='email'  placeholder='必填'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>手机</label>"+
           			" 	 	<input type='text' class='form-control' name='phone' id='phone'  placeholder='必填'>"+
           			"	 </div>"+
			        "  </div>"+
			        "  <div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>备注</label>"+
           			" 	 	<input type='text' name='other' id='other' class='form-control' >"+
           			"	 </div>"+
			        "  </div>"+
			        "  <div class='row'>"+
			        "    <div class='col-sm-12 form-group'>"+
			        "		<div class='tips'></div>"+
           			"	 </div>"+
			        "  </div>"+
					" </form>");
					$(".modal-footer").html("<button type='button' id='save_user' class='btn btn-primary' data-dismiss='alert'>保存用户</button>"+
					"<button type='button' class='btn btn-danger' data-dismiss='modal' >取消</button>");
					$('#myModal').modal();
					//$("#input_id").focus();
					var $inputs =  $("#new_user").find(".form-control");
					var input_len =$inputs.length;
					//console.log(input_len);
					
					//添加并完善用户信息之后保存数据
					$("#save_user").click(function(){
						var arr3 = [];//重新初始化数组
						for(var i=0;i<input_len;i++){
							arr3.push($inputs[i].value);
						}
						
						//验证表单 
						if(arr3[0]=="" || arr3[1] =="" || arr3[2] =="" || arr3[3]== ""){
							$(".tips").html("<p style='color:red;text-align:center'>必填信息不能为空！</p>");
							return false;
						}else{
							$(".tips").html("");
							//arr3 = arr3.toString();
							
//							$(this).attr({"disabled":"disabled"});
							var timer = null;
							$.ajax({
								type:"post",
								url:"",
								async:true,
								cache:false,
								data:arr3,
								dataType:"json",
								success:function(){
									$("#user_list").prepend(
				"						<div class='alert alert-warning alert-dismissible fade in' id='alert1' role='alert'>"+
 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
 				"						<span aria-hidden='true'>&times;</span>"+
 				"						</button>"+
  				"						<strong>保存用户成功!</strong>"+
				"						</div>");							
										
									$("#alert1").fadeOut(2000);
								},		
								error:function(){								
										$("#user_list").prepend(
					"						<div class='alert alert-warning alert-dismissible fade in' id='alert2' role='alert'>"+
	 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	 				"						<span aria-hidden='true'>&times;</span>"+
	 				"						</button>"+
	  				"						<strong>保存用户失败!</strong>"+
					"						</div>");
										$("#alert2").fadeOut(2000);
								}
							});
							
//							$("#save_user").removeAttr("disabled");
						}
					});
				});
				
				
			//点击搜索用户
			$("#search").click(function(){
				
				var userMsgValue = $("#user_message").val();
				if(userMsgValue){
					alert(userMsgValue);
					$.ajax({
						type:"post",
						url:userMsgValue,
						async:true,
						data:"",
						dataType:"json",
						cache:false,
						success:function(){
							
						},
						error:function(){
							
						}
					});
				}else{
					$("#myModal").addClass("bs-example-modal-sm");
					$(".modal-dialog").addClass("modal-sm");
					$(".modal-body").text("请输入您要搜索的用户名...");
					$(".modal-footer").html("<button type='button' class='btn btn-primary' id='search_sure' data-dismiss='modal'>确定</button>");
					$('#myModal').modal();
					
				}
			});
		
		});