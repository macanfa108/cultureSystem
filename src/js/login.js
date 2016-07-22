
(function($){
	$(function(){
				$("#submit").click(function(){


					var text = $("#text").val();
					var psw = $("#psw").val();
					var validate = $("#validate").val();
					var formParam = {
						"user.username": text,
						"user.passwd": psw,
						"check": validate
					};
					alert(JSON.stringify( formParam ));
					console.log(formParam);
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
							window.location.href="index.jsp";
						}else if(jsonStr === "\"failure\""){
							alert("登陆失败，密码错误，你不是管理员，你滚蛋");
						}else if(jsonStr === "\"checkfail\""){
							alert("验证码错误");
						}
					},
					error:function(data){
						alert("fail");
					}
				});
				});
			});
			
})(jQuery);