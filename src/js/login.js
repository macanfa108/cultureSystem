

			$(function(){
				$("#submit").click(function(){


					var text = $("#text").val();
					var psw = $("#psw").val();
					var validate = $("#validate").val();
					var formParam = {
						"post.text": text,
						"post.pwd": psw,
						"post.check": validate
					};
//					console.log(formParam);
					var url = "${pageContext.request.contextPath}/user_Login.do";


					$.ajax({
						type:"post",
						url:url,
						data:formParam,
						dataType:"json",
						async:true,
						success:function(data){
							var stt = JSON.stringify( data );
							console.log(stt + "##############");
							var jsonStr = JSON.stringify( data.result.result );
							console.log(jsonStr);
							if(jsonStr === "\"success\""){
								window.location.href="${pageContext.request.contextPath}/index.jsp";
							}else if(jsonStr === "\"failure\""){
	//							alert("登陆失败，密码错误，你不是管理员，你滚蛋");
								$("#myModal").addClass("bs-example-modal-sm");
								$(".modal-dialog").addClass("modal-sm");
								$(".modal-body").text("登陆失败，密码错误，你不是管理员，你滚蛋");
								$(".modal-footer").html("<button type='button' class='btn btn-primary' data-dismiss='modal'>确定</button>");
								$('#myModal').modal();
							}else if(jsonStr === "\"checkfail\""){
	//							alert("验证码错误");
								$("#myModal").addClass("bs-example-modal-sm");
								$(".modal-dialog").addClass("modal-sm");
								$(".modal-body").text("验证码错误");
								$(".modal-footer").html("<button type='button' class='btn btn-primary' data-dismiss='modal'>确定</button>");
								$('#myModal').modal();
							}
						},
						error:function(data){
	//						alert("fail");
							$("#myModal").addClass("bs-example-modal-sm");
							$(".modal-dialog").addClass("modal-sm");
							$(".modal-body").text("登录失败，服务器开小差了(；′⌒`)");
							$(".modal-footer").html("<button type='button' class='btn btn-primary' data-dismiss='modal'>确定</button>");
							$('#myModal').modal();
						}
					});
				});
			});