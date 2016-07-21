/*编辑=157
 * 
 *
 *
 */
/*用户管理*/

	$(function(){

		var page = 1;
		//页面一加载的时候发送ajax请求
    	var totalPages1;
       	loadAjax1(page);
        
        //用户操作历史记录请求的ajax
        var page2 = 1;
        var totalPages2;
        loadAjax2(page2);
        


			//页面已加载的时候获取文本框的焦点
			$("#user_message").focus();
			//删除用户
			$("#delete_user").click(function(){
				deleteData("#delete_user");
			});
			//删除用户操作历史
			$("#delete_history").click(function(){
				deleteData("#delete_history");
			});
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
			//删除用户：
			function deleteData(delete_id){
				var $checkboxs = $(delete_id).parent("form").siblings("table").find("tbody").find("input[type=checkbox]");
				var checkboxLen = $checkboxs.length;//找到tr中全部checkbox的长度
				
				var $checkeds = $(delete_id).parent("form").siblings("table").find("tbody").find("input:checked");
				var checkedLen = $checkeds.length;//找到选中的checkbox长度
				var $userId = $checkeds.parent().next();//拿到选中td的id
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
							arr.push($userId[i].innerText);
						}
						ids = arr.toString();//转换成字符传 
						alert(ids);

						ids={"ids":ids}
						
						//点击确定之后发送请求删除数据
						$.ajax({
							type:"post",
							data:ids,
							url:"${pageContext.request.contextPath}/user_deleteByIds.do?",
							async:false,
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
								//测试返回的数据
//								var jsona = JSON.stringify(data);
//								alert(jsona);
								if(data.result.result == "success"){
									
									//删除后去掉全选的勾选
									var $chAll = $("table").find("input.checkAll").prop("checked",false);
									
									var deleteTrs = $checkeds.parents("tr");
									$(deleteTrs).remove();
									$("#user_list").prepend(
				"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				"						</button>"+
				"						<strong>删除用户成功!</strong>"+
				"						</div>");	
									$("#alert1").fadeOut(2500);
								}else{
									$("#user_list").prepend(
				"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				"						</button>"+
				"						<strong>删除用户失败!</strong>"+
				"						</div>");	
									$("#alert1").fadeOut(2500);
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
					});
				}
				
			}
			
				//点击td选中tr
				//$("table").find("tr").find("td:not(:last-child)").on("click",function(){
			 $("table").on("click","input[type=checkbox]",function(){
					//var checked = $(this).parent().find("input").prop("checked");
					//$(this).parent().find("input").prop("checked",!checked);
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
			
	
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
				//点击编辑用户信息
				/*
				 * 返回数据格式：{"result", "success"} {"result", "failure"}
				 */
				 $("table").on("click",".edit_message",function(){
				//$("table").find(".edit_message").click(function(){
					var $tds = $(this).parents("tr").find("td");
					var tdslen = $tds.length;
					var arr2 = [];
					for(var i=1;i<tdslen;i++){
						arr2.push($tds[i].innerText);
					}
					//默认是小窗口，去掉下面的样式就变成大窗口
					$("#myModal").removeClass("bs-example-modal-sm");
					$(".modal-dialog").removeClass("modal-sm");
					//给窗口中添加表单
					$(".modal-body").html(
					"	<form>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>用户名</label>"+
           			" 	 	<input type='text' name='user_name' placeholder='必填' id='user_name' class='form-control' value='"+arr2[1]+"'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>邮箱</label>"+
           			" 	 	<input type='email' placeholder='必填'  name='user_email' id='user_email' class='form-control' value='"+arr2[2]+"'>"+
           			"	 </div>"+
			        "  </div>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>手机</label>"+
           			" 	 	<input type='text' placeholder='必填' name='user_phone' id='user_phone' class='form-control' value='"+arr2[3]+"'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>备注</label>"+
           			" 	 	<input type='text' name='user_other' id='user_other' class='form-control' value='"+arr2[5]+"'>"+
           			"	 </div>"+
			        "  </div>"+
			        "  <div class='row'>"+
			        "    <div class='col-sm-12 form-group'>"+
			        "		<div class='tips'></div>"+
           			"	 </div>"+
			        "  </div>"+
					" </form>");
					$(".modal-footer").html("<button type='button' id='save' class='btn btn-primary' data-dismiss='modal'>保存</button>"+
					"<button type='button' class='btn btn-danger' data-dismiss='modal' >取消</button>");
					$('#myModal').modal();
					
					//编辑后保存用户到数据库
					$("#save").click(function(){
						alert("编辑方法");
						var arr2_1 = [];
						arr2_1[0] = $("#user_name").val();
						arr2_1[1] = $("#user_email").val();
						arr2_1[2] = $("#user_phone").val();
						arr2_1[4] = $("#user_other").val();
						
						//验证表单
						if(arr2_1[0]=="" || arr2_1[1] =="" || arr2_1[2] ==""){
							$(".tips").html("<p style='color:red;text-align:center'>必填信息不能为空！</p>");
							return false;
						}else{
							
							if(!validator("email").test(arr2_1[1])){
								$(".tips").html("<p style='color:red;text-align:center'>邮箱格式不正确！</p>");
								return false;
							}else if(!validator("phone").test(arr2_1[2])){
								$(".tips").html("<p style='color:red;text-align:center'>手机号码格式不正确！</p>");
								return false;
							}else{
								//验证成功之后拿到表单里面的值

								var formParm = {
										"user.id":arr2[0],
										"user.username":$("#user_name").val(),
										"user.passwd":$("#user_name").val(),
										"user.phonenumber":$("#user_phone").val(),
										"user.email":$("#user_email").val(),
										"user.description":$("#user_other").val()
								}
//								alert("提交的修改数据是"+JSON.stringify( formParm ));
								//编辑好发送数据给后台添加成功之后返回success
								$.ajax({
									type:"post",
									url:"${pageContext.request.contextPath}/user_updateUser.do",
									async:true,
									data:formParm,
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
										var editObj = data;
										alert("你返回的"+JSON.stringify(data));
										//判断是否成功修改
										if(data.result.result == "success"){
											$this.parents("tr").html(
													"			<td><input type='checkbox' /></td>"+
													"			<td>"+editObj.user.id+"</td>"+
													"			<td>"+editObj.user.username+"</td>"+
													"			<td>"+editObj.user.email+"</td>"+
													"			<td>"+editObj.user.phonenumber+"</td>"+
													"			<td>"+editObj.user.registerTime+"</td>"+
													"			<td>"+editObj.user.description+"</td>"+
							        	            "			<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
													"	</tr>");
											
											$("#user_list").prepend(
						"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
						"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
						"						</button>"+
						"						<strong>编辑用户成功!</strong>"+
						"						</div>");	
											$("#alert1").fadeOut(2500);
										}else{
											$("#user_list").prepend(
						"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
						"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
						"						</button>"+
						"						<strong>编辑用户失败!</strong>"+
						"						</div>");	
											$("#alert1").fadeOut(2500);
										}


									},
									error:function(){
										$("#user_list").prepend(
					"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
					"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
					"						</button>"+
					"						<strong>编辑用户失败！服务器开小差了￣へ￣</strong>"+
					"						</div>");	
										$("#alert1").fadeOut(2500);
									},
									complete:function(){
										$("#load").remove();
									}
								});
						}
						
					};
					
				});
			});	
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------				
				//点击添加用户
				/*
				 * 返回数据格式：保存成功：{"result", "success"} 用户名已经存在：{"result", "failure"}
				 */
				$("#add_user").click(function(){
					//先移除小窗口的样式再进行添加表单
					$("#myModal").removeClass("bs-example-modal-sm");
					$(".modal-dialog").removeClass("modal-sm");
					//添加表单到模态框中
					$(".modal-body").html(
					"	<form id='new_user'>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label class='control-label'>用户名</label>"+
           			" 	 	<input type='text' class='form-control' name='username' id='username' placeholder='必填' >"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label class='control-label'>邮箱</label>"+
           			" 	 	<input type='email' class='form-control' name='email' id='email'  placeholder='必填'>"+
           			"	 </div>"+
			        "  </div>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label class='control-label'>密码</label>"+
           			" 	 	<input type='password' class='form-control' name='password' id='password'  placeholder='必填'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label class='control-label'>确认密码</label>"+
           			" 	 	<input type='password' class='form-control' name='password' id='password'  placeholder='必填'>"+
           			"	 </div>"+
			        "  </div>"+
			        "  <div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label class='control-label'>手机</label>"+
           			" 	 	<input type='text' class='form-control' name='phone' id='phone'  placeholder='必填'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label class='control-label'>备注</label>"+
           			" 	 	<input type='text' name='other' id='other' class='form-control' >"+
           			"	 </div>"+
			        "  </div>"+
			        "  <div class='row'>"+
			        "    <div class='col-sm-12 form-group'>"+
			        "		<div class='tips'></div>"+
           			"	 </div>"+
			        "  </div>"+
					" </form>");
					$(".modal-footer").html("<button type='button' id='save_user' class='btn btn-primary' data-dismiss='modal'>保存用户</button>"+
					"<button type='button' class='btn btn-danger' data-dismiss='modal' >取消</button>");
					$('#myModal').modal();
					//$("#input_id").focus();
					var $inputs =  $("#new_user").find(".form-control");
					var input_len =$inputs.length;
					//console.log(input_len);
					
					//添加并完善用户信息之后保存数据
					$("#save_user").click(function(){
						//alert("保存方法1");
						var arr3 = [];//重新初始化数组
						for(var i=0;i<input_len;i++){
							arr3.push($inputs[i].value);
						}
						
						//验证表单 
						if(arr3[0]=="" || arr3[1] =="" || arr3[2] =="" || arr3[3]== "" || arr3[4]== ""){
							$(".tips").html("<p style='color:red;text-align:center'>必填信息不能为空！</p>");
							return false;
						}else{
							//非空验证进入格式验证
							if(!validator("email").test(arr3[1])){
								$(".tips").html("<p style='color:red;text-align:center'>邮箱格式不正确！</p>");
								return false;
							}else if(arr3[2] != arr3[3]){
								$(".tips").html("<p style='color:red;text-align:center'>两次密码不一致！</p>");
								return false;
							}else if(!validator("phone").test(arr3[4])){
								$(".tips").html("<p style='color:red;text-align:center'>手机号码格式不正确！</p>");
								return false;
							}else{
//								var timer = null;
								var formParm1 = {
										"user.username":arr3[0],
										"user.email":arr3[1],
										"user.passwd":arr3[2],
										"user.phonenumber":arr3[4],
										"user.description":arr3[5],
								}
								//alert("打印添加的数据"+JSON.stringify( formParm1 ));
								//验证成功之后发送请求
								$.ajax({
									type:"post",
									url:"${pageContext.request.contextPath}/user_addUser.do",
									async:false,
									cache:false,
									data:formParm1,
									dataType:"json",
									beforeSend:function(){
										$("body").append("<div id='load'>"+
										"		<div class='loading'>"+
										"			<img src='images/ajax-loader-3.gif'/>"+
										"		</div>"+
										"	</div>");
									},
									success:function(data){
										var updatePages = data;
//										alert(JSON.stringify(updatePages));
										var datastr = JSON.stringify( data );
//										alert(datastr);
										var dataObj2 = data.user;
//										alert(dataObj2);
										var trLength = $("#user_list_tbody").find("tr").length;
//										alert(trLength);
										if(data.result.result == "success"){
												++totalPages1;
												$("#user_list").prepend(
							"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
			 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
			 				"						</button>"+
			  				"						<strong>保存用户成功!</strong>"+
							"						</div>");	
												$("#alert1").fadeOut(2500);
												
												if(trLength==4){
													return false;
												}
												alert(trLength);
												$("#user_list_tbody").append(
							        	            "	<tr>"+
							        	            "			<td><input type='checkbox' /></td>"+
							        	            "			<td>"+dataObj2.id+"</td>"+
							        	            "			<td>"+dataObj2.username+"</td>"+
							        	            "			<td>"+dataObj2.email+"</td>"+
							        	            "			<td>"+dataObj2.phonenumber+"</td>"+
							        	            "			<td>"+dataObj2.registerTime+"7</td>"+
							        	            "			<td>"+dataObj2.description+"</td>"+
							        	            "			<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
							        	            "	</tr>");
											
										}else{
											$("#user_list").prepend(
						"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
		 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
		 				"						</button>"+
		  				"						<strong>该用户名已经存在，请重新输入！</strong>"+
						"						</div>");	
											$("#alert1").fadeOut(3000);
										}

										var stt = JSON.stringify( data );
										//if(jsonStr === "\"success\""){
										$("#user_list").prepend(
					"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
	 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	 				"						</button>"+
	  				"						<strong>保存用户成功!</strong>"+
					"						</div>");	
										$("#alert1").fadeOut(2500);

									},		
									error:function(){
										$("#save_user").attr({"data-dismiss":'modal'});
										$("#user_list").prepend(
					"						<div class='alert alert-danger alert-dismissible fade in' id='alert2' role='alert'>"+
	 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	 				"						</button>"+
	  				"						<strong>保存用户失败！服务器开小差了￣へ￣</strong>"+
					"						</div>");
										$("#alert2").fadeOut(2500);
										
									},
									complete:function(){
										$("#load").remove();
	//									$("#save_user").removeAttr("disabled");
									}
								});
							}
							
						}
					});
				});
				
				
				
			//点击搜索用户
			$("#search").click(function(){
				//拿到搜索框中的值
				var userMsgValue = $("#user_message").val();
//				alert(userMsgValue);
				if(userMsgValue){
//					alert(userMsgValue);
					//进行后台查询
					$.ajax({
						type:"post",
						url:"${pageContext.request.contextPath}/user_findByName.do",
						async:true,
						data:{"user.username":userMsgValue},
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
							var searchUserStr = JSON.stringify(data);
//							alert("前台查找"+searchUserStr);
							var searchData = data.user;
//							alert(JSON.stringify(searchData));
							if(data.result.result == "success"){
								//查询成功返回数据放到表格中
								$("#user_list_tbody").html(
								"	 <tr class='success'>"+
									"	<td><input type='checkbox' /></td>"+
									"	<td>"+searchData.id+"</td>"+
									"	<td>"+searchData.username+"</td>"+
									"	<td>"+searchData.email+"</td>"+
									"	<td>"+searchData.phonenumber+"</td>"+
									"	<td>"+searchData.registerTime+"</td>"+
									"	<td>"+searchData.description+"</td>"+
									"	<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
								"	</tr>");
								
								$("#user_list").prepend(
					"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
	 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	 				"						</button>"+
	  				"						<strong>查询用户成功!</strong>"+
					"						</div>");	
								$("#alert1").fadeOut(2500);
							}else{
								$("#user_list").prepend(
			    "						<div class='alert alert-danger alert-dismissible fade in' id='alert2' role='alert'>"+
				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				"						</button>"+
				"						<strong>没有找到该用户！</strong>"+
		     	"						</div>");
								$("#alert2").fadeOut(2500);
							}
						},
						error:function(){
							
						},
						complete:function(){
							$("#load").remove();
//									$("#save_user").removeAttr("disabled");
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
			
			//页面一加载的时候发送ajax请求        
			function loadAjax1(page){
	        	 $.ajax({
	                 type:"post",
	                 url:"${pageContext.request.contextPath}/user_selectPage.do?page.page="+page,
	                 async:false,
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
	                	//先清空列表
	             		$("#user_list_tbody").html("");
	             		for(var i=0;i<len;i++){
	                 		$("#user_list_tbody").append(
	             	            "	<tr>"+
	             	            "			<td><input type='checkbox' /></td>"+
	             	            "			<td>"+dataObj[i].id+"</td>"+
	             	            "			<td>"+dataObj[i].username+"</td>"+
	             	            "			<td>"+dataObj[i].email+"</td>"+
	             	            "			<td>"+dataObj[i].phonenumber+"</td>"+
	             	            "			<td>"+dataObj[i].registerTime+"7</td>"+
	             	            "			<td>"+dataObj[i].description+"</td>"+
	             	            "			<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
	             	            "	</tr>");
	                 	}
	             		
	             		
	                 },
	                 error:function(){
	                     $("#user_list").prepend(
	     "						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
	     "						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	     "						</button>"+
	     "						<strong>加载失败！服务器开小差了￣へ￣</strong>"+
	     "						</div>");
	                     $("#alert1").fadeOut(2500);
	                 },
	                 complete:function(){
	                     $("#load").remove();
	                 }
	             });
	        } 
			
			//用户操作历史记录请求的ajax
	        function loadAjax2(page2){
		       	 $.ajax({
		                type:"post",
		                url:"${pageContext.request.contextPath}/user_selectPage.do?page.page="+page2,
		                async:false,
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
		                	 //加载页面的时候拿到总页面数量
		                 	totalPages2= data.result.pageNum;
		                 	//拿到用户数据长度
		                	var dataObj = data.result.rows;
		                	var len = dataObj.length;
		                	//先清空列表
	                 		$("#user_do_history").html("");
	                 		for(var i=0;i<len;i++){
	                     		$("#user_do_history").append(
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
		    "						<strong>加载失败！服务器开小差了￣へ￣</strong>"+
		    "						</div>");
		                    $("#alert1").fadeOut(2500);
		                },
		                complete:function(){
		                    $("#load").remove();
		                }
		            });
	       } 	        

		      //用户列表分页

	           $('.light-pagination1').pagination({
		        	pages: totalPages1,
		           	cssStyle: 'light-theme',
		           	onPageClick:function(page){
		               	loadAjax1(page);
	           	}
	           });    
		        
		        
		      //用户操作历史分页
		        $('.light-pagination2').pagination({
		        	pages: totalPages2,
		        	cssStyle: 'light-theme',
		           	onPageClick:function(page){
		               	loadAjax2(page);
		           	}
		        });
			
			
			//邮箱,手机号码正则表达式验证
				function validator(type){
					var json = {
						"email":/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
						"phone":/^1[3|4|5|7|8]\d{9}$/
					}
					return json[type];
				}
//				var str = "13420156755@163.com";
//				alert(validator("email").test(str));
		
		});