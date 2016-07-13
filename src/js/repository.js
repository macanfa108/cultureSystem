$(function(){

  /*专家知识养殖库上传下载文件*/
  var titleDom=$("#MessageBox .modal-header .modal-title");
  var modaltitleDom=$("#MessageBox .modal-body");

  $("#downloadDocument").click(function(){
    titleDom.text($(this).text());
    modaltitleDom.text('请问您确认下载该专家知识库文档吗？');
    $("#MessageBox").modal();
    $("#sure").click(function(){
      $("#MessageBox").modal('hide');
      window.location.href=$("#context-url").val() + "/knowledge_download.do";
    });
  });
  $("#uploadDocument").click(function(){
    titleDom.text($(this).text());
    modaltitleDom.html(
    '<form id="uploadForm" enctype="multipart/form-data">'+
    '      <div class="form-group">'+
    '        <label for="file-name" class="control-label">请上传指定的word文档(.doc):</label>'+
    '        <input type="file" name="file" class="form-control" id="file-name"></br>'+
    '        <button type="button" class="btn btn-info" id="sureUpload"><span class="icon icon-cloud-upload"></span> 上传更新</button></br>'+
     '        <p class="text-info" id="uploadMsg"></p>'+
    '      </div>'+
    '    </form>');

    $("#MessageBox").modal();
    $("#sureUpload").click(function(){
    	var uploadUrl = $("#context-url").val() + "/knowledge_update.do";
    	if(window.confirm('你确定要更新知识库吗？（更新前请先备份）')){
    		$.ajax({
        	    url: uploadUrl,
        	    type: 'POST',
        	    cache: false,
        	    data: new FormData($('#uploadForm')[0]),
        	    processData: false,
        	    contentType: false
        	}).done(function(res) {
        		var str = JSON.stringify( res.result.result );
        		if(str == "\"uploadFail\""){
        			$("#uploadMsg").html("文件上传失败！");
        		}else if(str == "\"success\""){
            		window.location.href=$("#context-url").val() + "/knowledge_showUI.do";
        		}else if(str == "\"FileError\""){
        			$("#uploadMsg").html("上传的文件无效！");
        		}else if(str == "\"typeError\""){
        			$("#uploadMsg").html("上传类型错误！");
        		}
        	}).fail(function(res) {
        		$("#uploadMsg").html("服务器出错，上传失败！");
        	});
    	}
    });
  });
});

/*专家知识养殖库页面iframe自适应宽度和高度*/
function iFrameHeight() {
		var ifm = document.getElementById("iframepage");
		var subWeb = document.frames ? document.frames["iframepage"].document :ifm.contentDocument;
		if (ifm != null && subWeb != null) {
			ifm.height = subWeb.body.scrollHeight;
			ifm.width = subWeb.body.scrollWidth;
		}
}
