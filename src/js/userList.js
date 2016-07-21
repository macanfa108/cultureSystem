
/*用户管理*/
	$(function(){
			$.ajax({
				type:"post",
				url:"http://cors.itxti.net/?weschool.jking.net/search?anywords=%22test%22&page=2&rows=5",
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
					$("#user_list_tbody").append(
				"	<tr>"+
				"			<td><input type='checkbox' /></td>"+
				"			<td>2</td>"+
				"			<td>fsfsd</td>"+
				"			<td>125675205@qq.conm</td>"+
				"			<td>13420016565</td>"+
				"			<td>2016/5/18 22:09:27</td>"+
				"			<td>...</td>"+
				"			<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
				"	</tr>"+
				"	<tr>"+
				"			<td><input type='checkbox' /></td>"+
				"			<td>2</td>"+
				"			<td>fsfsd</td>"+
				"			<td>125675205@qq.conm</td>"+
				"			<td>13420016565</td>"+
				"			<td>2016/5/18 22:09:27</td>"+
				"			<td>...</td>"+
				"			<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
				"	</tr>");
					$("#user_do_history").append(
				"	<tr>"+
				"			<td><input type='checkbox' /></td>"+
				"			<td>2</td>"+
				"			<td>fsfsd</td>"+
				"			<td>125675205@qq.conm</td>"+
				"			<td>13420016565</td>"+
				"			<td>2016/5/18 22:09:27</td>"+
				"			<td>...</td>"+
				"	</tr>"+
				"	<tr>"+
				"			<td><input type='checkbox' /></td>"+
				"			<td>2</td>"+
				"			<td>fsfsd</td>"+
				"			<td>125675205@qq.conm</td>"+
				"			<td>13420016565</td>"+
				"			<td>2016/5/18 22:09:27</td>"+
				"			<td>...</td>"+
				"	</tr>");
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

			//jquery分页
	        $('.light-pagination1').pagination({
	        	pages: 20,
	        	cssStyle: 'light-theme'
	        });
	        //jquery分页
	        $('.light-pagination2').pagination({
	        	pages: 20,
	        	cssStyle: 'light-theme'
	        });

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
//						alert(arr);
						$.ajax({
							type:"post",
							url:"http://cors.itxti.net/?weschool.jking.net/search?anywords=%22test%22&page=2&rows=5",
							async:true,
							data:arr,
							dataType:"json",
							cache:false,
							beforeSend:function(){
								$("body").append("<div id='load'>"+
								"		<div class='loading'>"+
								"			<img src='images/ajax-loader-3.gif'/>"+
								"		</div>"+
								"	</div>");
							},
							success:function(){
								$("#user_list").prepend(
			"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
			"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
			"						</button>"+
			"						<strong>删除用户成功!</strong>"+
			"						</div>");
								$("#alert1").fadeOut(2500);
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
				$("table").on("click","input[type=checkbox]",function(){
//					var checked = $(this).parent().find("input").prop("checked");
//					$(this).parent().find("input").prop("checked",!checked);
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
				$("table").on("click",".edit_message",function(){
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
           			" 	 	<input type='text' name='user_name' placeholder='必填' id='user_name' class='form-control' value='"+arr2[0]+"'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>邮箱</label>"+
           			" 	 	<input type='email' placeholder='必填'  name='user_email' id='user_email' class='form-control' value='"+arr2[1]+"'>"+
           			"	 </div>"+
			        "  </div>"+
					"	<div class='row'>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>手机</label>"+
           			" 	 	<input type='text' placeholder='必填' name='user_phone' id='user_phone' class='form-control' value='"+arr2[2]+"'>"+
           			"	 </div>"+
			        "    <div class='col-sm-6 form-group'>"+
			       	" 	 	<label for='recipient-name' class='control-label'>备注</label>"+
           			" 	 	<input type='text' name='user_other' id='user_other' class='form-control' value='"+arr2[4]+"'>"+
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
						var arr2_1 = [];
						arr2_1[0] = $("#user_name").val();
						arr2_1[1] = $("#user_email").val();
						arr2_1[2] = $("#user_phone").val();
//						arr2_1[3] = $("#user_createTime").val();
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
								$.ajax({
									type:"post",
									url:"http://cors.itxti.net/?weschool.jking.net/search?anywords=%22test%22&page=2&rows=5",
									async:true,
									data:arr2_1,
									dataType:"json",
									cache:false,
									beforeSend:function(){
										$("body").append("<div id='load'>"+
										"		<div class='loading'>"+
										"			<img src='images/ajax-loader-3.gif'/>"+
										"		</div>"+
										"	</div>");
									},
									success:function(){
										$("#user_list").prepend(
					"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
					"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
					"						</button>"+
					"						<strong>编辑用户成功!</strong>"+
					"						</div>");
										$("#alert1").fadeOut(2500);
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

				//点击添加用户

				$("#add_user").click(function(){
					$("#myModal").removeClass("bs-example-modal-sm");
					$(".modal-dialog").removeClass("modal-sm");

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
						var arr3 = [];//重新初始化数组
						for(var i=0;i<input_len;i++){
							arr3.push($inputs[i].value);
						}

						//验证表单
						if(arr3[0]=="" || arr3[1] =="" || arr3[2] =="" || arr3[3]== "" || arr3[4]== ""){
							$(".tips").html("<p style='color:red;text-align:center'>必填信息不能为空！</p>");
							return false;
						}else{

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
								$.ajax({
									type:"post",
									url:"http://cors.itxti.net/?weschool.jking.net/search?anywords=%22test%22&page=2&rows=5",
									async:true,
									cache:false,
									data:arr3,
									dataType:"json",
									beforeSend:function(){
	//									$("#save_user").attr({"disabled":"disabled"});
	//									$("#save_user").text("保存中...");
										$("body").append("<div id='load'>"+
										"		<div class='loading'>"+
										"			<img src='images/ajax-loader-3.gif'/>"+
										"		</div>"+
										"	</div>");
									},
									success:function(){
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

				var userMsgValue = $("#user_message").val();
				if(userMsgValue){
//					alert(userMsgValue);
					$.ajax({
						type:"post",
						url:"http://cors.itxti.net/?weschool.jking.net/search?anywords=%22test%22&page=2&rows=5",
						async:true,
						data:userMsgValue,
						dataType:"json",
						cache:false,
						beforeSend:function(){
							$("body").append("<div id='load'>"+
							"		<div class='loading'>"+
							"			<img src='images/ajax-loader-3.gif'/>"+
							"		</div>"+
							"	</div>");
						},
						success:function(){
							$("#user_list").prepend(
				"						<div class='alert alert-success alert-dismissible fade in' id='alert1' role='alert'>"+
 				"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
 				"						</button>"+
  				"						<strong>查询用户成功!</strong>"+
				"						</div>");
							$("#alert1").fadeOut(2500);

							//查询成功返回数据
							$("#user_list_tbody").html("<tr>"+
						"	<td><input type='checkbox' /></td>"+
						"	<td>1</td>"+
						"	<td>fdsfA</td>"+
						"	<td>125675205@qq.conm</td>"+
						"	<td>13420016565</td>"+
						"	<td>2016/5/18 22:09:27</td>"+
						"	<td>...</td>"+
						"	<td class='edit'><input type='button' class='btn btn-info btn-xs edit_message' value='编辑' /></td>"+
					"	</tr>");
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
