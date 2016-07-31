
//数据管理

//点击按钮确认备份数据
$("#confirmBackup").off().on("click",function(){
	//获取select选中的值
	var value1_1 = $("#select1_1 option:selected").text();
	var value1_2 = $("#select1_2 option:selected").text();
	var jsonVal_1 = {
		value1_1:value1_1,
		value1_2:value1_2
	}
//	var jsonVal = JSON.stringify(jsonVal);
//	alert(jsonVal);
	//禁用按钮
	$("button").prop("disabled",true);
	publicAjax({
		data:jsonVal_1,
		url:"",
		beforeSendMessage:"正在备份中···",
		successMessage:"成功备份数据！",
		failMessage:"备份数据失败！请重试",
		errorMessage:"备份失败！服务器开小差了￣へ￣"
	});
});

//点击按钮确认还原数据
$("#confirmRestore").off().on("click",function(){
	//获取对应select选中的值
	var value2_1 = $("#select2_1 option:selected").text();
	var value2_2 = $("#select2_2 option:selected").text();
	var jsonVal_2 = {
		value2_1:value2_1,
		value2_2:value2_2
	}
	//禁用按钮
	$("button").prop("disabled",true);
	publicAjax({
		data:jsonVal_2,
		url:"",
		beforeSendMessage:"正在还原中···",
		successMessage:"成功还原数据！",
		failMessage:"还原数据失败！请重试",
		errorMessage:"还原失败！服务器开小差了￣へ￣"
	});
});

//点击按钮确认导出数据
$("#confirmExport").off().on("click",function(){
	//获取对应select选中的值
	var value3_1 = $("#select3_1 option:selected").text();
	var value3_2 = $("#select3_2 option:selected").text();
	var jsonVal_3 = {
		value3_1:value3_1,
		value3_2:value3_2
	}
	//禁用按钮
	$("button").prop("disabled",true);
	publicAjax({
		data:jsonVal_3,
		url:"",
		beforeSendMessage:"正在导出中···",
		successMessage:"成功导出数据！",
		failMessage:"导出数据失败！请重试",
		errorMessage:"导出失败！服务器开小差了￣へ￣"
	});
});




//公用ajax

function publicAjax(myJson){
	$.ajax({
		type:"post",
		url:myJson.url,
		async:true,
		cache:false,
		data:myJson.data,
		dataType:"json",
		beforeSend:function(){
			$("#dataSave").prepend(
	"						<div class='alert alert-info alert-dismissible fade in' id='alert1' role='alert'>"+
	"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	"						</button>"+
	"						<strong>"+myJson.beforeSendMessage+"</strong>"+
	"						</div>");	
			$("#alert1").fadeOut(2500);			
		},
		success:function(data){
			if(data.result == "success"){
				$("#dataSave").prepend(
	"						<div class='alert alert-info alert-dismissible fade in' id='alert1' role='alert'>"+
	"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	"						</button>"+
	"						<strong>"+myJson.successMessage+"</strong>"+
	"						</div>");	
				$("#alert1").fadeOut(2500);	
				
				//开启按钮
				$("button").prop("disabled",false);
			}else{
				$("#dataSave").prepend(
	"						<div class='alert alert-info alert-dismissible fade in' id='alert1' role='alert'>"+
	"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
	"						</button>"+
	"						<strong>"+myJson.failMessage+"</strong>"+
	"						</div>");	
				$("#alert1").fadeOut(2500);	
			}
		},
		error:function(){
			$("#user_list").prepend(
"						<div class='alert alert-danger alert-dismissible fade in' id='alert1' role='alert'>"+
"						<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
"						</button>"+
"						<strong>"+myJson.errorMessage+"</strong>"+
"						</div>");	
			$("#alert1").fadeOut(2500);
		},
		complete:function(){
			$("#load").remove();
		}
		
	});
}
